<template>
  <div>
    <div>
      <p><input v-model="addStuObj.id" /></p>
      <p><input v-model="addStuObj.name" /></p>
      <p><input v-model="addStuObj.age" /></p>
      <button @click="addStuList">添加</button>
    </div>
    <p>{{ msg }}</p>
    <button @click="addMsg">msg add</button>
    <div>
      <ul>
        <li v-for="(item, index) in stuList" :key="index" @click="remList">
          name:{{ item.name }},age:{{ item.age }}岁
        </li>
      </ul>
    </div>
    <div>
      <h1>多层级嵌套练习</h1>
      <p>{{obj.gf}}</p>
      <p>{{obj.gf.fb.fb}}</p>
      <p>{{obj.gf.fb.cl.cl}}</p>
    </div>
    <button @click="changeObj">更改数据</button>
  </div>
</template>

<script>
import { ref,shallowRef } from "vue";
// ref 可用来监听简单数据的变化

import { reactive,shallowReactive } from "vue";
// reactive 可监听相对复杂的数据 
// 为节省性能，可使用shallowReactive，只对一层级进行响应式改变

export default {
  name: "HelloWorld",
  data() {
    return {};
  },
  setup() {
    let msg = ref(0);
    // ref声明数据 动态监听msg的值
    function addMsg() {
      msg.value++;
    }
    let { stuList, remList } = userList();
    let {addStuObj,addStuList} = addStu(stuList) 

    let obj = reactive({
      gf:'gf',
      fd:{
        fd:'fd',
        cl:{
          cl:'cl'
        }
      } 
    })

    function changeObj(obj){
      
    }

    return { msg, addMsg, stuList, remList, addStuObj ,addStuList,obj,changeObj};
    // 将值暴露出去
  },
};
// 也可将数据放在setup的外面，外面并不影响方法的使用
function userList() {
  // reactive可声明较复杂数据
  const stuList = reactive([
    { id: 1, name: "lilei", age: 10 },
    { id: 1, name: "meimei", age: 11 },
    { id: 1, name: "ww", age: 12 },
  ]);
  function remList(index) {
    stuList.splice(index, 1);
  }
  return { stuList, remList };
}
function addStu(state) {
  let addStuObj = ref({
    id: "",
    age: "",
    name: "",
  });
  function addStuList(){
    console.log(addStuObj)
    let obj = { ...addStuObj.value };
    state.push(obj)
  }
  return {addStuObj,addStuList}
}
</script>
