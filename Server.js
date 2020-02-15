const express=require("express")
const bodyParser=require('body-parser')
const MongoClient=require("./database/connection")
const app=express();
const WebHookModel=require("./database/WebHook.model")
app.use(bodyParser.urlencoded({extends:false}))

app.use(bodyParser.json())

MongoClient().then(()=>{
    console.log("connected")
}).catch(console.log)
app.get("/",(req,res)=>
{
    res.send("welcome to hands on demo of webHook")
})

app.get("/api/webhook",(req,res)=>
{
    WebHookModel
    .find()
    .then((wh)=>{
        res.json({
            flag:true,
            data:wh,
            messsage:"Successfully fetched"

        });
    })

    .catch(e=>{
        res.json({
            flag:false,
            data:null,
            messsage:e.messsage

        });
    })
   
})

app.post("/api/webhook",(req,res)=>{
    let body=req.body;

    WebHookModel
    .create(body)
    .then((wh)=>{
        res.json({
            flag:true,
            data:wh,
            messsage:"Successfully fetched"

        });
    })

    .catch(e=>{
        res.json({
            flag:false,
            data:null,
            messsage:e.messsage

        });
    })
    
})

app.put("/api/webhook/:id",(req,res)=>
{

    let body=req.body;

    WebHookModel
    .findByIdAndUpdate(req.params.id,body)
    .then( wh => {
        res.json({
            flag:true,
            data:wh,
            messsage:"Successfully updated"
        });
    })

    .catch(e=>{
        res.json({
            flag:false,
            data:null,
            messsage:e.messsage

        });
    })

})

app.delete("/api/webhook/:id",(req,res)=>{

    WebHookModel.findByIdAndRemove(req.params.id,function(err,wh){
        if(err){

            res.json({
                flag:false,
                data:null,
                messsage:err.messsage
    
            });
        }
        else{

        
       
            res.json({
               
                    flag:true,
                    data:wh,
                    messsage:"Successfully deleted"
                })
          
       
}
    })

     
})

app.listen(3000)
// .then(()=>{
//     console.log("server successfully");

// })
