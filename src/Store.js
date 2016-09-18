import { observable } from 'mobx';

class Store {
  @observable directory = window.process.env.TMPDIR || window.process.env.TMP;
  @observable posts = [];
  @observable selected = 1;
}

export default Store;
