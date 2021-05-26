<template>
  <div>
    <div>
      {{ obj2 }}
    </div>
    <button @click="changeDate">改变数据</button>
  </div>
</template>
<script>
import { reactive } from "vue";
import { toRaw } from "vue";

export default {
  data() {
    return {};
  },
  setup() {
    let obj = { name: "lilei", age: 18 };
    let obj2 = reactive(obj);
    // toRaw 可以获得被reactive处理后的元数据
    const obj3 = toRaw(obj2);
    function changeDate() {
      obj3.name = "hanmei";
      console.log(obj == obj3);
      console.log(obj);
      console.log(obj2);
    //   通过处理后的数据重新进行reactive并不能刷新页面
      obj2 = reactive(obj3);
    //   只有改变其中值的时候才能重新刷新页面
      obj2.age ++ ;
    }

    console.log(obj == obj3);
    console.log(obj);
    console.log(obj2);

    return { obj2, changeDate };
  },
};
</script>