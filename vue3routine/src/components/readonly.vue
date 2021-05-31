<template>
  <div>
    <div>obj2 :{{ obj }}</div>
    <button @click="changeDate">改变数据</button>
  </div>
</template>
<script>
import { ref } from "vue";
// 返回一个ref方法，可根据实际情况进行自定义
import { readonly, shallowReadonly,isReadonly } from "vue";
// 当遇到一些特殊情况需要保护数据时，readonly使数据变成只读数据

export default {
  data() {
    return {};
  },

  setup() {

    // let obj = readonly({ name: "lilei",student:["Hanmei","lisi"], age: 18 })
    // readonly 会给所有的层级都套上只读

    let obj = shallowReadonly({ name: "lilei",stu:{student:["Hanmei","lisi"]}, age: 18 })
    // shallowReadonly 只会将第一层变成只读，其他层级还是可以编辑
    
    function changeDate() {
        obj.stu.student = ["zhangSan"]
        console.log(obj)
    }
    return { obj, changeDate };
  },
};
</script>