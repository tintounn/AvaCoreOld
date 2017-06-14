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

    let file = fs.readFileSync('./ascii.txt', {encoding: 'utf-8'});
    console.log(file);

    this.initConfig()
      .then(() => {
        return this.initRoutes()
    }).then(() => {
      return this.initModels();
    }).then(() => {
      this.log.info('connection to database...');
      return this.initDatabase();
    }).then(() => {
      this.log.success('database connected !');
      this.log.info('load services...');
      return this.initServices();
    }).then(() => {
      this.log.success('services loaded !');
      this.log.info('launch http server...');
      return this.initHttpServer();
    }).then(() => {
      this.log.success('http server launched !');
      this.log.info('launch socket server...');
      return this.initSocketServer();
    }).then(() => {
      this.log.success('socket server launched !');
      return this.initFinalSteps();
    }).then(() => {
      this.log.success('ava system launched :)');
    }).catch((err) => {
      this.log.error(err);
    });
  }

  initConfig() {
    return new Promise((resolve, reject) => {
      this.env = 'dev';
      nconf.argv();

      if(nconf.get('prod') || nconf.get('production')) this.env = 'prod';
      nconf.file(path.join(__dirname, 'config', this.env + '.json'));

      this.config = nconf;
      this.jwt = new Jwt();
      this.tools = Tools;
      this.log = new Log();
      this.root = __dirname;
      //this.zwaveGateway = new ZwaveGateway(this.config, __dirname);
      resolve();
    });
  }

  initDatabase() {
    this.database = new Database();
    return this.database.init(this.config, this.models);
  }

  initRoutes() {
    return new Promise((resolve, reject) => {
      this.router = express.Router();

      let controllers = includeAll({
        dirname: path.join(__dirname, 'app', 'controllers'),
        filter:  /(.+Controller)\.js$/,
        excludeDirs :  /^\.(git|svn)$/
      });

      this.policies = includeAll({
        dirname: path.join(__dirname, 'app', 'policies'),
        excludeDirs :  /^\.(git|svn)$/
      });

      for(let controller in controllers) {
        let controllerRoutes = controllers[controller].routes();

        for(let route in controllerRoutes) {
          let action = controllerRoutes[route];
          let method = route.split(' ')[0];
          let path = route.split(' ')[1];

          this.router[method](path, [auth], action);
        }
      }
      resolve();
    });
  }

  initModels() {
    return new Promise((resolve, reject) => {
      this.models = includeAll({
        dirname: path.join(__dirname, 'app', 'models'),
        excludeDirs :  /^\.(git|svn)$/
      });
      resolve();
    });
  }

  initServices() {
    return new Promise((resolve, reject) => {
      let services = includeAll({
        dirname: path.join(__dirname, 'app', 'services'),
        excludeDirs :  /^\.(git|svn)$/
      });

      for(let service in services) {
        let serviceName = service.split('.')[0];
        global[serviceName.charAt(0).toUpperCase() + serviceName.slice(1)] = new services[service]();
      }

      resolve();
    });
  }

  initHttpServer() {
    return new Promise((resolve, reject) => {
      this.express = express();

      this.express.use(bodyParser.urlencoded({extended: false}));
      this.express.use(bodyParser.json());
      this.express.use('/', this.router);
      this.express.use(express.static(path.join(__dirname, 'public', 'dist')));

      this.httpServer = http.createServer(this.express);
      this.httpServer.listen(this.config.get('http:port'), resolve);
    });
  }

  initSocketServer() {
    return new Promise((resolve, reject) => {
      this.io = require('socket.io')();
      this.io.attach(this.httpServer);
      this.io.on('connection', (socket) => this.handleSocketRequest(socket));
      resolve();
    });
  }

  initFinalSteps() {
    //this.zwaveGateway.listen();

    return new Promise((resolve, reject) => {
      Room.findAll().then((rooms) => {
        HomeService.launch(rooms);
        resolve();
      }).catch(reject);
    });
  }

  handleSocketRequest(socket) {
    for(let layer of this.router.stack) {
      let route = layer.route;
      let stack = route.stack[0];

      socket.on(stack.method + ' ' + route.path, (data) => {
        let requestId = data.requestId;

        let body = data.body;
        if(!body) body = {};

        let query = data.query;
        if(!query) query = {};

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
            if(!res.httpStatus) {
              res.httpStatus = 200;
            }

            socket.emit(stack.method + ' ' + route.path + ' ' + requestId, {data: data, status: res.httpStatus});
          }
        };
        this.router.handle(req, res, (err) => { console.log(err); });
      });
    }
  }
}

let app = new App();
global['ava'] = app;