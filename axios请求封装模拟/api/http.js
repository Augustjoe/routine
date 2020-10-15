// axios 和 ajax 是一个东西 axios是ajax的封装
// fetch是浏览器中的原生类，跟axios和ajax完全是俩个不一样的东西
//下载axios--yarn add axios qs --qs是另外的引用包

import axios from 'axios' //引入axios

//axios的基本语法
// axios.get(url,{ //url 请求的地址
//     params:{  //？后的需要传参的一些值
//     },
//     heards //传参的请求头
// }).then(result=>{  //成功后传参回来的结果

// }).cathch(err=>{   //失败后传参回来的错误

// })

switch( process.env.NODE_ENV ){ //环境的判断值
    case "production": //如果在生产环境 替换前缀
        axios.defaults.baseURL = "http://www.taikang.com";
        break;
    case "test":  //如果在测试环境替换前缀
        axios.defaults.baseURL = "http://192.168.1.1"
    default:
        axios.defaults.baseURL = "http://127.0.0.0:8080" //默认情况下 配置请求中相同前缀的URL
}

//  设置超时时间和跨域是否允许携带凭证
axios.defaults.withCredentials = true; // 跨域是否允许携带凭证
axios.defaults.timeout = 10000 //超时时间 10s

//设置传递的请求头格式 xxx = xxxx&xxx=xxxx
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'
//将post的请求头变成xxx = xxxx&xxx = xxxx这样的格式
axios.defaults.transformRequest = data => {qs.stringify(data)}

//设置请求拦截
//客户端发送请求 -》 请求拦截器 - 》  服务器
//token校验 接受服务器返回的token 每一次发送请求都应该把token1带上
axios.interceptors.request.use(config=>{
    let token = this.localStorage.getItem('token'); //获取token
    token && (config.headers.Authorization = token) //将token放在请求配置中
    return config
},error=>{
    return Promise.reject(error) //发生错误
})


//响应拦截器
//服务器返回信息 -》 拦截的统一处理 -》 客户端js获取到的信息

// 测试返回的状态码
// axios.defaults.validateStatus = status =>{
//     return /^(2|3)\d{2}$/.test(status)
// }

axios.interceptors.response.use(response=>{

},err=>{
    
})

