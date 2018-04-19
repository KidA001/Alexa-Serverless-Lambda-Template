import AppConstants from '../AppConstants';
import SayMyNameHandler from './SayMyNameHandler';

const handlers = {
  SayMyNameIntent() {
    const sayMyNameHandler = new SayMyNameHandler(this);
    return sayMyNameHandler.respond()
  },
  LaunchRequest() {
    return this.emit(':ask', this.t('WELCOME_PROMPT'), this.t('WELCOME_REPROMPT'));
  },
  'AMAZON.CancelIntent': function () { // eslint-disable-line func-names
    return this.emit(':tell', this.t('GOODBYE'));
  },
  'AMAZON.HelpIntent': function () { // eslint-disable-line func-names
    return this.emit(':ask', this.t('HELP_PROMPT'), this.t('WELCOME_REPROMPT'));
  },
  'AMAZON.StopIntent': function () { // eslint-disable-line func-names
    return this.emit(':tell', this.t('GOODBYE'));
  },
  SessionEndedRequest() {
    return this.emit(':tell', this.t('GOODBYE'));
  },
};

export default [
  handlers,
];
