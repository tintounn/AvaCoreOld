const http = require('http');
const path = require('path');
const fs = require('fs');
const nconf = require('nconf');
const Server = require('socket.io');
const bodyParser = require('body-parser');
const express = require('express');
const auth = require('./app/policies/auth');
const includeAll = require('include-all');

const Database = require('./database');
const Log = require('./log');
const Jwt = require('./jwt');
const Tools = require('./tools');

//const ZwaveGateway = require('./app/gateways/ZwaveGateway');
const AndroidTvGateway = require('./app/gateways/androidtv.gateway');
const HotSpotGateway = require('./app/gateways/hotspot.gateway');

class App {
  constructor() {
    let file = fs.readFileSync('./ascii.txt', { encoding: 'utf-8' });
    //console.log(file);

    this.startApp();
  }

  async startApp() {
    try {
      await this.initConfig();
      await this.initRoutes();
      await this.initDatabase();
      await this.initServices();
      await this.initHttpServer();
      await this.initSocketServer();
      await this.initGateways();
      await this.initFinalSteps();

      this.log.success('ava system launched :)');
    } catch (error) {
      this.log.error(error);
    }
  }

  initConfig() {
    nconf.argv();

    (nconf.get('prod') || nconf.get('production')) ? this.env = 'prod' : this.env = 'dev';
    nconf.file(path.join(__dirname, 'config', this.env + '.json'));

    this.config = nconf;
    this.jwt = new Jwt();
    this.tools = Tools;
    this.log = new Log();
    this.root = __dirname;
  }

  initDatabase() {
    this.log.info('connecting to database...');
    let models = includeAll({
      dirname: path.join(__dirname, 'app', 'models'),
      excludeDirs: /^\.(git|svn)$/
    });

    this.database = new Database();
    return this.database.init(this.config, models).then(() => this.log.success('connection to database successful !')); 
  }

  initRoutes() {
    this.log.info('init api routes...');
    this.router = express.Router();

    let controllers = includeAll({
      dirname: path.join(__dirname, 'app', 'controllers'),
      excludeDirs: /^\.(git|svn)$/
    });

    this.policies = includeAll({
      dirname: path.join(__dirname, 'app', 'policies'),
      excludeDirs: /^\.(git|svn)$/
    });

    for (let controller in controllers) {
      let controllerRoutes = controllers[controller].routes();

      for (let route in controllerRoutes) {
        let action = controllerRoutes[route];
        let method = route.split(' ')[0];
        let path = route.split(' ')[1];

        this.router[method](path, [auth], action);
      }
    }
    this.log.success('api routes initialized !');
  }

  initServices() {
    let services = includeAll({
      dirname: path.join(__dirname, 'app', 'services'),
      excludeDirs: /^\.(git|svn)$/
    });

    for (let service in services) {
      let serviceName = service.split('.')[0] + service.split('.')[1];
      global[serviceName.charAt(0).toUpperCase() + serviceName.slice(1)] = new services[service]();
    }
  }

  initHttpServer() {
    return new Promise((resolve, reject) => {
      this.log.info('starting http server...');
      this.express = express();
      let port = this.config.get('http:port');

      this.express.use(bodyParser.urlencoded({ extended: false }));
      this.express.use(bodyParser.json());
      this.express.use('/', this.router);
      this.express.use(express.static(path.join(__dirname, 'public', 'dist')));

      this.httpServer = http.createServer(this.express);
      this.httpServer.listen(port, () => {this.log.success(`http server launched on port ${port} !`); resolve()});
    });
  }

  initSocketServer() {
    return new Promise((resolve, reject) => {
      this.admins = new Server();
      this.admins.path('/admins');
      this.admins.listen(this.httpServer);

      resolve();
    });
  }

  initGateways() {
    this.log.info('starting gateways....');
    //this.zwaveGateway = new ZwaveGateway(this.config, this.root);
    this.androidTvGateway = new AndroidTvGateway(this.config);
    this.hotSpotGateway = new HotSpotGateway(this.config);

    //this.zwaveGateway.listen();
    this.androidTvGateway.listen(this.httpServer);
    this.hotSpotGateway.listen(this.httpServer);
    this.log.success('gateways started !');
  }

  initFinalSteps() {
    return new Promise((resolve, reject) => {
      Room.find().then((rooms) => {
        Homeservice.launch(rooms);
      }).catch(reject);
    });

  }
}

let app = new App();
global['ava'] = app;