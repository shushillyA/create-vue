  import Subscribe from './subscribe.js';
  // vue
  export default class Vue extends Subscribe{ // extends订阅队列
    constructor(opt) {
      super()
      this.opt = opt
      // 给属性ObjectDefineproperty
      this.observe(opt.data)
      let root = document.querySelector(opt.el)
      this.compile(root)
    }
    // 为每个属性添加观察者
    observe(data) {
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

    compile(node) {
      [].forEach.call(node.childNodes, child => {
        if (!child.firstElementChild && /\{\{(.+)\}\}/.test(child.innerHTML)) { // 叶子标签中有{{.*}}
          // 找到中间的key值 执行的正则会保存()匹配的值
          let key = RegExp.$1.trim()
          // g全局 i忽略大小写 m跨行
          child.innerHTML = child.innerHTML.replace(new RegExp(`\{\{\s*${key}\s*\}\}`, 'gm'), this.opt.data[key])
          Subscribe.target = child
          this.opt.data[key]
          Subscribe.target = null
        } else if (child.firstElementChild) { // 如果有子标签
          this.compile(child)
        }
      })
    }
  }