const exp=require('express')
const adminApp=exp.Router()
adminApp.get("/",(req,res)=>{
    res.send({message:"admin api connected"})
})

module.exports=adminApp