const exp = require("express");
const app = exp();
require('dotenv').config();//process.env
const mongoose = require("mongoose");
const userApp = require("./API/userApi");
const authorApp = require("./API/authorApi");
const clerkMiddleware = require('./middlewares/clerkMiddleware');
const cors=require('cors')
app.use(cors())



const port = process.env.PORT || 4000;

//db connection
mongoose.connect(process.env.DBURL)
    .then(() => {
        app.listen(port, () => console.log(`server listening on port ${port}..`))
        console.log("DB connection success")
    })
    .catch(err => console.log("Error in DB connection ", err))

//body parser middleware
app.use(exp.json())
//connect API rouites
app.use('/user-api',userApp)
app.use("/author-api",authorApp)
app.use('/protected-route', clerkMiddleware);


//error handler
app.use((err,req,res,next)=>{
    console.log("err object in express error handler :",err)
    
    res.send({message:err.message})
})