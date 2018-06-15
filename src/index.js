import Vue from './vue'

document.addEventListener('DOMContentLoaded', function() {
  let opt = {
    el: '#app', 
    data: {
      name: '检索中',
      age: 30,
      baba: 'syl'
    }
  }

  // 实例化vue
  let vm = new Vue(opt)

  // 调试
  setTimeout(function() {
    opt.data.name = 'syl'
  }, 2000)
})