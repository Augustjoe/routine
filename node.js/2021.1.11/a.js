var fo = "111"

console.log("a文件执行")

/*
    导出文件中的对象
    exports 也是对象，可以直接通过添加对象的方法添加
    要想使用文件作用域中的对象只能导出 
*/ 
exports.a = function(){
    console.log(fo)
    console.log("这里是a函数")
}