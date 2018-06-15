import Subscribe from './subscribe'
export default class Observer extends Subscribe {
  constructor() {
    super()
  }

  // 为每个属性添加观察者
  observe (data) {
    Object.keys(data).forEach((key) => {
      data['_'+key] = data[key]
      let _this = this
      Object.defineProperty(data, key, {
        get() {
          // 将订阅者放入订阅者通道实例
          Subscribe.target && _this.addSubNode(key, Subscribe.target)
          return data['_'+key]
        },
        set(newVal) {
          // 通过通道执行订阅者事件
          _this.update(key, newVal)
          data['_'+key] = newVal
        }
      })
    })
  }
} 