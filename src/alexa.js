/* eslint-disable import/prefer-default-export */
import Alexa from 'alexa-sdk';
import handlers from './handlers/handlers';
import resources from './etc/resources';
import Raven from 'raven';
import RavenLambdaWrapper from 'serverless-sentry-lib';

export const handler = RavenLambdaWrapper.handler(Raven, (event, context, callback) => {
  const alexa = Alexa.handler(event, context, callback);
  alexa.appId = process.env.alexa_app_id;
  alexa.resources = resources;
  alexa.registerHandlers(...handlers);
  alexa.execute();
});
