import { observable } from 'mobx'
import { join as paths } from 'path'

class Store {
  @observable directory = paths(process.env.HOME, 'Pictures') || __dirname
  @observable selectedImage = 0
  @observable selectedImagePath = ''
  @observable fillMode = 'bg-fill'
}

export default Store
