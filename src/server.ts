import compression from 'compression';
import cors from 'cors';
import {Request, Response} from "express";
import express from 'express';
import { Server } from 'http';
import http from 'http';
import { CodyConfig, ElementEdited, handleElementEdited } from './board/code';
import { makeNodeRecord } from './board/graph';
import { greeting, IioSaidHello } from './general/greeting';
import { checkQuestion, handleReply, Reply, test } from './general/question';
import {CodyResponse, CodyResponseType} from './general/response';
const bodyParser = require('body-parser');

const codyServer = (codyConfig: CodyConfig): Server => {

  const app = express();

  const options: cors.CorsOptions = {
    allowedHeaders: [
      'Origin',
      'X-Requested-With',
      'Content-Type',
      'Accept',
      'X-Access-Token',
      'Authorization'
    ],
    credentials: true,
    methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
    origin: '*',
    preflightContinue: false,
  };

  // GZIP compress resources served
  app.use(compression());
  app.use(cors(options));
  app.use(bodyParser.json());

  // Force redirect to HTTPS if the protocol was HTTP
  // if (!process.env.LOCAL) {
  //     app.use( enforce.HTTPS( { trustProtoHeader: true } ) );
  // }

  const server = http.createServer(app);

  enum Events {
    IioSaidHello= 'IioSaidHello',
    UserReplied = 'UserReplied',
    ElementEdited = 'ElementEdited',
    ConfirmTest = 'ConfirmTest',
  }

  app.post(`/messages/${Events.IioSaidHello}`, (req: Request<any, CodyResponse, IioSaidHello>, res: Response<CodyResponse>) => {
    console.log(Events.IioSaidHello);

    res.send(greeting(req.body.user))
  });

  app.post(`/messages/${Events.UserReplied}`, (req: Request<any, CodyResponse, Reply>, res: Response<CodyResponse>) => {
    console.log(Events.UserReplied, req.body);

    handleReply(req.body.reply).then(codyRes => {
      res.send(checkQuestion(codyRes));
    }, reason => {
      res.send({
        cody: "Look's like something went wrong!",
        details: reason.toString(),
        type: CodyResponseType.Error
    });
  });
});

app.post(`/messages/${Events.ElementEdited}`, (req: Request<any, CodyResponse, ElementEdited>, res: Response<CodyResponse>) => {
  console.log(Events.ElementEdited, req.body);

  handleElementEdited(makeNodeRecord(req.body.node), codyConfig).then(codyRes => {
    res.send(checkQuestion(codyRes));
  }, reason => {
    console.log(reason);
      res.send({
        cody: `Uh, sorry. Cannot handle element ${makeNodeRecord(req.body.node).getName()}!`,
        details: reason.toString(),
        type: CodyResponseType.Error
      });
    });
  });

  app.post(`/messages/${Events.ConfirmTest}`, (req: Request<any, CodyResponse, any>, res: Response<CodyResponse>) => {
    console.log(Events.ConfirmTest);

    res.send(checkQuestion(test()));
  });

  return server;
}

export default codyServer;
