import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

class LocalStorage {
  constructor() {
    this.store = {}
  }

  getItem(key) {
    return this.store[key]
  }

  setItem(key, string) {
    this.store[key] = string
  }

  clear() {
    this.store = {}
  }
}

global.localStorage = new LocalStorage;

configure({ adapter: new Adapter() });