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
   ref类型的数据会在html中自动添加value，reactive不会。
   vue3会通过自有属性 __v_ref 来进行判断
   vue3提供了 isRef 和 isReactive 来对两种类型的值进行判断
    