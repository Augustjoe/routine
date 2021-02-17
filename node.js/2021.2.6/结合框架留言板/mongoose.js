var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/msg')

var Schema = mongoose.Schema

var MsgSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    value:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now,
        // 枚举限制，只能是0或者1
        // enum:[0,1],
    },
})

module.exports = mongoose.model('Msg',MsgSchema)
