const mongoose=require('mongoose');

const WebHook=mongoose.Schema({
    name:String,
    payload:Object,
    addedBy:String,
    hobby:String
},{
    timeStamps:true
});

module.exports=mongoose.model("webhook",
WebHook);