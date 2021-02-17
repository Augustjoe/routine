function get(url){
    return new Promise((resolve,reject)=>{
        var oReq = new XMLHttpRequest()
        oReq.onload = function() {
            resolve(oReq.responseText)
        }
        oReq.onerror = function(err) {
            reject(err)
        }
        oReq.open("get",url,true)
        oReq.send()
    })
}