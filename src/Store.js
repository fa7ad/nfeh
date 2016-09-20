import { observable } from 'mobx'

class Store {
  @observable directory = process.env.TMPDIR || __dirname
  @observable posts = []
  @observable selectedImage = 1
}

export default Store
