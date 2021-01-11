var a = "222"
console.log("b开始执行")
/*
    可以通过requir的方式加载其他文件模块 
     相对路径必须加 ./
     可以省略后缀 
*/ 

var aFile = require("./a")
aFile.a() 

console.log("b执行执行结束")

/*
    在node中没有全局作用域，只有模块化作用域
        外部访问不到内部
        内部也访问不到外部
        每一个文件都可以被是为一个独立的作用域
*/ 
console.log(a)