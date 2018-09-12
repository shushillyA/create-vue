export default class Subscribe{
  constructor() {
    // 订阅通道
    this.subNode = {}
  }
  addSubNode(key, node) {
    if (!this.subNode[key]) this.subNode[key] = []
    this.subNode[key].push(node)
  }
  update(key, newVal) {
    Object.values(this.subNode[key]).forEach(ele => {
      if (key === 'name') console.dir(ele)
      if (ele.nodeName === 'INPUT') ele.value = newVal
      ele.innerHTML = newVal
    })
  }
}