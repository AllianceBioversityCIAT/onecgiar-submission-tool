import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import {startAccsCtrl} from '../middlewares/access-control';
import {startMulter} from '../middlewares/multer';
import Routes from '../routes';
import morgan from 'morgan';
import tx2 from 'tx2';
let meter = tx2.meter({
  name: 'req/sec',
  samples: 1,
  timeframe: 60
});

export default ({app}: {app: express.Application}) => {
  const parentDir = require('path').resolve(process.cwd(), '../');

  meter.mark();
  app.use(morgan('dev'));
  app.use(express.urlencoded({extended: true}));
  app.use(express.json());
  // middlewares
  startAccsCtrl();
  startMulter(parentDir);

  app.use(cors());
  app.use(helmet({frameguard: false}));

  app.use(function (req, res, next) {
    res.setHeader(
      'Content-Security-Policy',
      "script-src 'self' https://apis.google.com http://clarisatest.ciat.cgiar.org/api/ https://initiativestest.ciat.cgiar.org/apiClarisa/*"
    );
    res.setHeader('Cross-Origin-Resource-Policy', 'same-site');
    // Website you wish to allow to connect
    res.setHeader(
      'Access-Control-Allow-Origin',
      'https://initiatives.cgiar.org'
    );
    next();
  });

  app.use(express.static(parentDir + '/one-cgiar-front/dist/submission-tool'));

  // public files
  app.use(express.static('public'));

  // routes
  app.use('/api', Routes);

  // load front
  app.get('/', (req, res) => {
    res.sendFile(
      parentDir + '/one-cgiar-front/dist/submission-tool/index.html'
    );
  });

  app.all('*', (req: any, res: any) => {
    console.log(`[TRACE] Server 200 request: ${req.originalUrl}`);
    res
      .status(200)
      .sendFile(parentDir + '/one-cgiar-front/dist/submission-tool/index.html');
  });
};
