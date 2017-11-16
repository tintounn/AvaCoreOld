const http = require('http');
const path = require('path');
const fs = require('fs');
const nconf = require('nconf');
const bodyParser = require('body-parser');
const express = require('express');
const auth = require('./app/policies/auth');
const includeAll = require('include-all');

const Database = require('./database');
const Log = require('./log');
const Jwt = require('./jwt');
const Tools = require('./tools');
//const ZwaveGateway = require('./app/gateways/ZwaveGateway');

class App {
  constructor() {
    let file = fs.readFileSync('./ascii.txt', { encoding: 'utf-8' });
    console.log(file);

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
    this.database.init(this.config, models); 
    this.log.success('connection to database successful !');
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
      let serviceName = service.split('.')[0];
      global[serviceName.charAt(0).toUpperCase() + serviceName.slice(1)] = new services[service]();
    }
  }

  initHttpServer() {
    return new Promise((resolve, reject) => {
      this.log.info('starting http server...');
      this.express = express();

      this.express.use(bodyParser.urlencoded({ extended: false }));
      this.express.use(bodyParser.json());
      this.express.use('/', this.router);
      this.express.use(express.static(path.join(__dirname, 'public', 'dist')));

      this.httpServer = http.createServer(this.express);
      this.httpServer.listen(this.config.get('http:port'), () => {this.log.success('http server launched !'); resolve()});
    });
  }

  initSocketServer() {
    this.log.info('starting socket server...');
    this.io = require('socket.io')();
    this.io.attach(this.httpServer);
    this.io.on('connection', (socket) => this.handleSocketRequest(socket));
    this.log.success('socket server launched !');
  }

  initFinalSteps() {
    //this.zwaveGateway.listen();

    return new Promise((resolve, reject) => {
      /*Room.findAll().then((rooms) => {
        HomeService.launch(rooms);
        
      }).catch(reject);*/
      resolve();
    });
  }

  handleSocketRequest(socket) {
    for (let layer of this.router.stack) {
      let route = layer.route;
      let stack = route.stack[0];

      socket.on(stack.method + ' ' + route.path, (data) => {
        let requestId = data.requestId;

        let body = data.body;
        if (!body) body = {};

        let query = data.query;
        if (!query) query = {};

        let req = {
          url: route.path,
          method: stack.method,
          body: body,
          query: query,
          isSocket: true,
          socket: socket
        };

        let res = {
          httpStatus: null,

          status: (httpStatus) => {
            res.httpStatus = httpStatus;
            return res;
          },

          sendStatus: (httpStatus) => {
            res.status(httpStatus).json({});
          },

          json: (data) => {
            if (!res.httpStatus) {
              res.httpStatus = 200;
            }

            socket.emit(stack.method + ' ' + route.path + ' ' + requestId, { data: data, status: res.httpStatus });
          }
        };
        this.router.handle(req, res, (err) => { console.log(err); });
      });
    }
  }
}

let app = new App();
global['ava'] = app;