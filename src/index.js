import Vue from './vue'

document.addEventListener('DOMContentLoaded', function() {
  let opt = {
    el: '#app', 
    data: {
      name: 'loading',
      age: 'loading',
      todo1: 'loading',
      todo2: 'loading'
    }
  }

  window.data = opt.data

  // 实例化vue
  let vm = new Vue(opt)

  // 调试
  setTimeout(function() {
    opt.data.name='syl'
    opt.data.age='25'
    opt.data.todo1 = '肥家'
    opt.data.todo2 = '打ps4'
  }, 2000)
})