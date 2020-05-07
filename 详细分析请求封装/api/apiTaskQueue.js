import {Loading} from 'element-ui' //以服务的方式调用element的loading

function ApiTaskQueue (){ //创建一个一个新class，准备作为容器，继承方法
    this.loading = '';
    this.push_task = [];
    this.api_cancel_token = {};
    this.loadingObject = Loading;
}
// 创建loading
ApiTaskQueue.prototype.startLoading = function () { //启动遮罩loading的方法
    this.loading = this.loadingObject.service({
        lock: true,         //同 v-loading 指令中的 lock 修饰符
        text: '加载中……',   //显示在加载图标下方的加载文案
        customClass:'task-full-loading',    //Loading 的自定义类名
        background: 'rgba(0, 0, 0, 0.1)'    //遮罩背景色
    })
};
ApiTaskQueue.prototype.endLoading = function (){
    this.loading ? this.loading.close() :'';
};
// 添加请求任务队列
ApiTaskQueue.prototype.addCancelTokenTask = function(key,cancel){
    this.api_cancel_token[key] = cancel;
};
// 删除请求的任务id
ApiTaskQueue.prototype.removeCancelTokenTask = function(key){
    delete this.api_cancel_token[key];
    this.tryHideFullScreenLoading({name:key}) //axios 的响应拦截器 每次响应都会调用这个方法
};
//   终止请求任务
ApiTaskQueue.prototype.cancelTokenTask = function(key) {
    if(key) {//终止单个请求
        this.api_cancel_token[key]('cancel');
        this.removeCancelTokenTask(key);  //调用删除请求任务id的方法
    } else {//终止所有请求
        for (const url in this.api_cancel_token) {
            if (this.api_cancel_token.hasOwnProperty(url)) { //确认url是否存在 Object的hasOwnProperty()方法返回一个布尔值，判断对象是否包含特定的自身（非继承）属性。
                this.api_cancel_token[url]('cancel');
                this.removeCancelTokenTask(url); //删除请求任务的id
            }
        }
    }
}
// 添加更新loading队列
ApiTaskQueue.prototype.showFullScreenLoading = function (task) {
    if (this.push_task.length === 0) { //如果传入值为空，启动loading
        this.startLoading();
    }
    this.push_task.push(task);
    // this.updatatasks();
};
// 删除任务队列
ApiTaskQueue.prototype.tryHideFullScreenLoading = function(task = {name:''}) {
    if (typeof task === 'string'){ //如果task的值不正确则结束请求
        this.endLoading();
        this.push_task.length = 0;
        return false;
    }
    if (this.push_task.length > 0){  //如果请求队列里不为空
        for (let i = 0; i < this.push_task.length; i++) {
            const item = this.push_task[i];
            if (item.name === task.name) { //查找是否有要删除的请求
                this.push_task.splice(i, 1); // 删除
                break;
            }
        }
    }
    if (this.push_task.length === 0) { //如果队列为空，结束
        this.endLoading();
    }
    // this.updatatasks();
};
// 更新队列
ApiTaskQueue.prototype.updatatasks = function(){
    let ele = '';
    // if (process.env.NODE_ENV !== 'development' && process.env.NODE_ENV !== 'production'){
    ele = document.getElementsByClassName('task-full-loading'); //获取element的加载元素
    // }
    if (ele) {
        let a = ele[0],
        str = ``;
        if(this.push_task.length > 0) {
            str += `<p class="tipsred" title="点击取消！"  style="position: absolute; left: 50%; top: 50%; font-size: 18px; margin-left: 40px; margin-top: 16px;"><i class="el-icon-close pointer"></i></>`;
        }
        let div = a.getElementsByTagName('div')[0];
        // 判断是存在子元素
        let c_div = div.getElementsByTagName('div');
        let newele;
        if (c_div && c_div.length > 0){
            newele = c_div[0];
            newele.innerHTML = str;
        } else {
            newele = document.createElement('div');
            newele.innerHTML = str;
            div.appendChild(newele);
        }
    }
};
  export {
      ApiTaskQueue
  }