function shallowRef(obj) {
  return shallowReactive({ value: obj })
}

function shallowReactive(obj) {
  return new Proxy(obj, {
    get(obj, key) {
      return obj[key]
    },
    set(obj, key, val) {
      obj[key] = val
      // readonly 只需在set方法中不更新数据即可实现
      console.log("更新视图")
      return true
    }
  })
}

// 具体的reactive 方法就是将对象中的每一个元素都进行proxy的处理
function reactive(obj){
  if(typeof obj){
    // 是数组则遍历每个值去处理
    if(obj instanceof Array){
      obj.forEach((item,index)=>{
        if(typeof item == "object"){
          obj[item] = reactive(item)
        }
      })
    } else {
      // 是对象则同样处理每个值
      for(let key in obj){
        typeof obj[key] == "object" && (obj[key] = reactive(obj))
      }
    }

    return new Proxy(obj, {
      get(obj, key) {
        return obj[key]
      },
      set(obj, key, val) {
        obj[key] = val
        console.log("更新视图")
        return true
      }
    })

  } else {
    console.warn("not a object")
  }


}

let state = shallowReactive({ name: "leili", age: 18 })
state.age = 19