import AppConstants from '../AppConstants';
import SayMyNameHandler from './SayMyNameHandler';

const handlers = {
  SayMyNameIntent() {
    const sayMyNameHandler = new SayMyNameHandler(this);
    return sayMyNameHandler.respond()
  },
  LaunchRequest() {
    this.emit(':ask', this.t('WELCOME_PROMPT'), this.t('WELCOME_REPROMPT'));
  },
  'AMAZON.CancelIntent': function () {
    this.emit(':tell', this.t('GOODBYE'));
  },
  'AMAZON.HelpIntent': function () {
    this.emit(':ask', this.t('HELP_PROMPT'), this.t('WELCOME_REPROMPT'));
  },
  'AMAZON.StopIntent': function () {
    this.emit(':tell', this.t('GOODBYE'));
  },
  SessionEndedRequest() {
    this.emit(':tell', this.t('GOODBYE'));
  },
};

export default [
  handlers,
];
