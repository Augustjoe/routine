
import {basicConfigParam} from './api-basic'
// 定义接口映射，数据请求类型，请求方式
/* params : POST请求的参数，query ：GET请求的参数 */

const ApiMap = ({key = "",params = {},query = {},loading = true}) => {
    /* 
    *[key]:请求接口的映射字段
    *[name]:接口名称
    *[value]:接口对应的地址
    *[type]:请求方式 default [post]
    *[ContentType]:数据发送格式 default [application/json;charset=UTF-8]
    *[notToken]:是否需要验证登录权限 default [null] 需要验证
    */
    const apiMapList = {
        ...basicConfigParam,
        'login':{name:'登录接口',value:'/api/v1/login',type:'post',notToken:true},
        'getDictionaryListData':{name:'获取用户数据字典',value:'/api/v1/dictType/DictTypes',type:'post'},
        // 'getCitiesData':{name:'获取城市列表',value:'/api/v1/area/list'},
        // 'getStatusStatistics':{name:'获取办理状态',value:'/api/v1/auditDoubtTask/getStatusStatistics',type:'get'},
        'getNineTableDataList':{name:'获取九宫格菜单',value:'/api/v1/userModule/getModuleByUserCode',type:'post'},
        'getSysMenu':{name:'获取系统菜单',value:'/api/v1/menu/getUserLeftMenuTrees',type:'get'},
        'updatePassWord':{name:'修改登录密码',value:'/api/v1/user/editUserPassword',type:'post'},
        'resetPassWord':{name:'重置密码',value:'/api/v1/user/resetUserPassword',type:'get'},

    };
    return {key,...apiMapList[key],params,query}
};
export {
    ApiMap
}