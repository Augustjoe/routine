<template>
  <div>
    <div>
      obj2 :{{ obj2 }}
    </div>
     <div>
      obj3 :{{ obj3 }}
    </div>
    <button @click="changeDate">改变数据</button>
  </div>
</template>
<script>
import { ref } from "vue";
import { toRef } from "vue";

export default {
  data() {
    return {};
  },
  setup() {
    let obj = { name: "lilei", age: 18 };
    
    // ref 绑定特定值可以做深拷贝，页面的上的值与原值无关 
    let obj2 = ref(obj.name)
    
    // toref 可对特定值做浅拷贝 ，但更新数据时，页面并不刷新
    let obj3 = toRef(obj,"name")

    function changeDate() {
        obj3.value = "hanmei"

        console.log(obj)
        console.log(obj2)
        console.log(obj3)
    //   obj2.value = "hanmei"
    }

    return {  obj3 , changeDate };
  },
};
</script>