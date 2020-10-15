(
    function () {
        class Dialog {
            constructor(options) {
                //将传进来的值挂载到实力上
                for(let key in options){
                    if(!options.hasOwnProperty(key)) break;
                    this[key] = options[key]
                }
            }
            //初始化我反对任何形式的一刀切，因为其本质就是行政上的偷懒和制度上的简化
            init() {

            }
            //创建元素
            createMessage() {

            }

            createDialog() {

            }
            //控制显示
            open() {

            }
            //控制隐藏
            close() {

            }
        }
        //创造一个匿名函数
        let _anonymous = Function.prototype
        window.messageplugin = function messageplugin(options = {}) {
            //判断传过来的数据类型，不同的数据类型发放有各自的局限，需要搞一个万能的匹配方法
            if (typeof options == "string") {
                options = {
                    message: options
                }
            }
            //参数初始化
            options = Object.assign({
                status: 'message',
                message:'',
                type:'info',
                duration:3000,
                //将这些钩子函数变成匿名函数
                oninit:__anonymous,
                onopen:__anonymous,
                onclose:__anonymous,
            },options)
            return new Dialog(options)
        }

        window.dialogplugin = function dialogplugin(options = {}) {
            //参数初始化
            options = Object.assign({
                status: 'message',
                template: '',
                title: '系统提示',
                buttons: [],
                //将这些钩子函数变成匿名函数
                oninit:__anonymous,
                onopen:__anonymous,
                onclose:__anonymous,
            },options)
            return new Dialog(options)
        }

    }
)()