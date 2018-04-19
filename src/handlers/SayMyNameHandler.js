export default class SayMyNameHandler {
  constructor(alexa) {
    this.alexa = alexa;
    this.userProvidedName = this.alexa.event.request.intent.slots.name.value;
  }

  async respond() {
    if (!this.userProvidedName) return this.promptForName();
    return this.alexa.emit(':tell', `Oh hey there ${this.userProvidedName}`);
  }

  promptForName() {
    const tell = 'Sure, what is your first name?'
    return this.alexa.emit(':elicitSlot', 'name', tell);
  }
}
