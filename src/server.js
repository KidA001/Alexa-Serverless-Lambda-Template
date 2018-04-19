import Alexa from 'alexa-sdk';
import bodyParser from 'body-parser'; // eslint-disable-line import/no-extraneous-dependencies
import express from 'express'; // eslint-disable-line import/no-extraneous-dependencies
import './environment';
import handlers from './handlers/handlers';
import resources from './etc/resources';
import Raven from 'raven';

Raven.config(process.env.sentry_dsn).install();

const server = express();
server.use(Raven.requestHandler());
server.use(Raven.errorHandler());

server.use(bodyParser.json());

server.post('/', (req, res) => {
  const context = {
    fail: () => {
      res.sendStatus(500);
    },
    succeed: (data) => {
      res.send(data);
    },
  };

  const alexa = Alexa.handler(req.body, context);
  alexa.appId = process.env.alexa_app_id;
  alexa.resources = resources;
  alexa.registerHandlers(...handlers);
  alexa.execute();
});

server.listen(3000, () => {
  console.log('Listening...');
});
