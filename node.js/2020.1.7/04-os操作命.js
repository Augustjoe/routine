var os = require('os')
/*
 nodejs 中大部分模块都是封装好的 用户引入自己用就好 中文 nodeJs网址 http://nodejs.cn/api/os.html
*/ 
// 查看cpu详情
console.log(os.cpus())
// 查看内存总量
console.log(os.totalmem())