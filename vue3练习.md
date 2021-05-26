 # 安装vite 
   npm install -g create-vite-app vue作者自创的工具
 # 创建vue3文件 
   create-vite-app 项目名称
 # vue3中setup的应用
   1. setup运行在beforCreate之后，created之前，这时data和methods尚未生成，故无法使用this，this在setup中为undefined
   2. setup函数只能同步运行无法异步运行
 # reactive 应用
   1. reactive 是vue3中提供的用以实现响应式的方法，与vue2不同，是通过proxy来实现的
   2. reactive 的参数必须为对象（json/arr），如果传递了其他类型值，不会实现响应式
   3. 如果传递数组，则会将数组变为类数组的对象。
 # ref 应用
   1. ref是vue3为了方便追踪单个数据实现响应式，准备的方法
   2. ref的底层依然是reactive，系统会根据传进来的值进行转换
      ref(xx) -> reactive({value:xx})
   3. 在html中不必通过value获取值，但在js中需要value属性去修改和获取值
 # ref和reactive的区别
   1. ref类型的数据会在html中自动添加value，reactive不会。
   2. vue3会通过自有属性 __v_ref 来进行判断
   3. vue3提供了 isRef 和 isReactive 来对两种类型的值进行判断
 # 递归函数监听
   1. ref和reactive都可以将嵌套对象的每一层包装成proxy对象进行数据监听，但及其消耗性能 

   ## 为此vue3新增了两个数组函数 shallowReactive shallowRef 
   ### shallowReactive
     shallowReactive 只会将多层级对象的第一层包装为proxy对象
   * 只有更新第一层级的数据页面才会刷新，其他情况页面不会刷新
   ### shallowRef
    shallowRef 只会监听第一层对象的value，当其更新时，页面才会刷新
   * 只会监听value数据，如果更改第一层的原数据页面不会刷新,需更新整个数据才会更新
   * 为应对刷新的特殊情况，vue提供了triggerRef方法，只需将数据再传入triggerRef中，即可刷新相关组件
   * shallowRef（data） 本质依然是调用shallowReactive（{value：data}），所以许多特性都可迎刃而解


    