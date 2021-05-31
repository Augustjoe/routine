<template>
  <div>
    <div>obj2 :{{ obj2 }}</div>
    <button @click="changeDate">改变数据</button>
  </div>
</template>
<script>
import { ref } from "vue";
// 返回一个ref方法，可根据实际情况进行自定义
import { customRef } from "vue";

export default {
  data() {
    return {};
  },

  setup() {
    function myRef(value) {
     
      return customRef((track, trigcer) => {
        return {
          get() {
              track()
            console.log("get", value);
            return value
          },
          set(newValue) {
              trigcer()
            console.log("set", newValue);
            newValue.like = "sex";
            value = newValue
          },
        };
      });
    }

    let obj = { name: "lilei", age: 18 };
    let obj2 = myRef(obj)
    function changeDate() {
        obj2.value = {name:"meimei",age:16}
        console.log(obj2)
    }

    return { obj2, changeDate };
  },
};
</script>