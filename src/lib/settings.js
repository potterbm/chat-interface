class Settings {
  constructor() {
    this.values = {
      debug : true,
      mode  : 'normal',
    };
  }

  get(key) {
    return this.values[key];
  }

  set(key, value) {
    this.values[key] = value;
  }
}

export default new Settings();
