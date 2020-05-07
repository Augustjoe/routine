// 配置全局请求
import axios from'axios'
import qs from 'qs';
import {msgTips} from 'common/js/msgTips.js'
import {setUrlQuery} from 'common/js/util.js'
import {LogOut} from 'common/js/logOut.js'
import {ApiTaskQueue} from './apiTaskQueue.js'
const CancelToken = axios.CancelToken;
const cancel_token = CancelToken.source();
const axiosConfig = {
    headers: {
        'Content-Type': 'application/json;charset=UTF-8', //告诉服务器传值的类型
        // 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    }, 
    responseType: 'json', //设置返回的数据为json
    // timeout: 20000,
    withCredentials: true  //是否运行跨域 XMLHttpRequest.withCredentials  属性是一个Boolean类型，它指示了是否该使用类似cookies,authorization headers(头部授权)或者TLS客户端证书这一类资格证书来创建一个跨站点访问控制（cross-site Access-Control）请求。在同一个站点下使用withCredentials属性是无效的。
}
const isProduction = process.env.NODE_ENV === 'production';
let reqTask = {};
let apiTaskQueue = new ApiTaskQueue();
// axios请求拦截器
axios.interceptors.request.use(
    req => {
        apiTaskQueue.showFullScreenLoading({name:req.url});//显示全屏loading
        req.cancelToken = new axios.CancelToken(canceltoken => {
            apiTaskQueue.addCancelTokenTask(req.url,canceltoken);
        });
        if(!req.headers.notToken) {
            // 获取本地token 
            const getLocalToken = localStorage.getItem('Access-Token');
            // 判断本地是否有token,如果没有就退出登录
            if(isProduction) {
                if(!getLocalToken) {
                    LogOut();
                    apiTaskQueue.cancelTokenTask(req.url);//取消请求，并退出登录
                } else {
                    req.headers['Access-Token'] = getLocalToken;
                }
            }
            delete req.headers.notToken;
        }
        // console.log(reqTask);
        return req;
    },
    err => {
        return Promise.reject(err);
    }
);
// 定义登录过期或无token时的退出提示
let flagLoginOut = false;
const messageError = (msg) => {
    !flagLoginOut ? msgTips('error',msg) : '';
};
const latterLogOut = () => {
    if(!flagLoginOut) {
        flagLoginOut = true;
        localStorage.removeItem('Access-Token');
        setTimeout(() => {
            flagLoginOut = false;
            LogOut();
        }, 3000);
    }
};
// axios响应拦截器
axios.interceptors.response.use(
    res => {
        console.log(res);
        apiTaskQueue.tryHideFullScreenLoading({name:res.config.url});//隐藏全屏loading
        if(res.status === 200) {
            return res;
        }
    },
    err => {
        console.log(err);
        console.log(err.response);
        if(err.response && err.response.status) {
            switch (err.response.status) {
                case 0:
                    let statusText = err.response.statusText;
                    if (statusText === 'error') {
                       messageError('网络异常,请检查网络连接');
                    } else if (statusText === 'timeout') {
                       messageError('请求超时,请检查网络连接');
                    } else if (statusText === 'notmodified') {
                       messageError('notmodified');
                    } else if (statusText === 'parsererror') {
                       messageError('请求参数不能为空');
                    } else if (statusText.indexOf('NetworkError') > -1) {
                       messageError('未能正常访问服务器，请检查网络连接');
                    } else {
                       messageError(statusText);
                    }
                    break;
                case 400:
                    let msg = err.response.data.message;
                    if ( new RegExp('JWT expired').test(msg) ) {
                       messageError('登录已过期，3秒后跳转至登录页');
                       latterLogOut();
                    } else {
                       messageError(msg);
                    }
                    break;
                case 401: //没有登录
                   messageError('登录已过期，3秒后跳转至登录页');
                   latterLogOut();
                    break;
                case 403: //没有登录
                   messageError('访问被拒绝，3秒后跳转至登录页');
                   latterLogOut();
                    break;
                case 404:
                   messageError('系统正在维护，请稍后再试');
                    break;
                case 500: //服务器配置异常
                   messageError('系统内部异常');
                    break;
                default:
                    break;
            }
        }
        try {
            err.config ? apiTaskQueue.tryHideFullScreenLoading({name:err.config.url}) : '' ;//隐藏全屏loading
        } catch (err) {
            console.log(err);
        }
        return Promise.reject(err)
    }
);
const baseUrl = isProduction ? '/portal' : 'proxyApi';
const imgUrl = process.env.NODE_ENV === 'production' ? '/portal/api/v1/getValidateCode' : 'proxyApi/api/v1/getValidateCode';
const resultData = (res) => {
    if(res.data) return res.data;
    if(typeof res.request.responseText === 'string') {
        return JSON.parse(res.request.responseText);
    }
    return res.request.response;
}
const CommonAjaxMethod = (options) => {
    let config = {
        ...axiosConfig,
        headers:{
            ...axiosConfig.headers,
            notToken:options.notToken || false
        },
        responseType:options.responseType || axiosConfig.responseType//数据返回的类型，默认返回json
    };
    // 判断请求方式类型
    const Type = options.type ? options.type.toLocaleLowerCase() : 'post';
    if(Type === 'get') {
        let url = options.value;
        if(Object.keys(options.query).length > 0) {
            // 如果GET请求的参数不为空，则添加拼接字符串
            url = setUrlQuery({url,query:options.query});
        }
        return axios.get(baseUrl + url,config).then((res) => {
            if(options.needHeader) {
                return res;
            }
            return resultData(res);
        })
    } else if (Type === 'post') {
        let url = options.value;
        if(Object.keys(options.query).length > 0) {
            // 如果POST请求的查询字符串参数不为空，则添加拼接字符串
            url = setUrlQuery({url,query:options.query});
        }
        let data = options.params;
        // 判断请求数据的类型
        if(options.ContentType && options.ContentType.toLocaleLowerCase() === 'formdata') {
            config.headers["Content-Type"] = 'application/x-www-form-urlencoded;charset=UTF-8';
            data = qs.stringify(options.params);
        }
        if(options.ResponeType && options.ResponeType.toLocaleLowerCase() === 'text') {
            config.responseType = 'text';
        }
        return axios.post(baseUrl  + url ,data,config).then((res) => {
            if(options.needHeader) {
                return res;
            }
            return resultData(res);
        }) 
    }
}
export {
    CommonAjaxMethod,
    baseUrl,
    imgUrl
}