  import Observer from './observer.js';
  import Subscribe from './subscribe.js'
  // vue
  export default class Vue extends Observer { // extends订阅队列
    constructor(opt) {
      super()
      this.opt = opt
      // 给属性ObjectDefineproperty
      this.observe(this.opt.data)
      let root = document.querySelector(opt.el)
      this.compile(root)
    }
    
    // 处理dom
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