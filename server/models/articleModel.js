const mongoose=require('mongoose')
const authorSchema=new mongoose.Schema({nameOfAuthor:{type:String,required:true},
email:{type:String,required:true},profileImageUrl:{type:String}},{"strict":"throw"})
const commentSchema=new mongoose.Schema({nameOfUser:{type:String,required:true},comment:{type:String,required:true}},{"strict":"throw"})
const articelSchema=new mongoose.Schema({
    authorData:authorSchema,
    articleId:{type:String,required:true},
    title:{type:String,required:true},
    category:{type:String,required:true},
    content:{type:String,required:true},
    dateOfCreation:{type:String,required:true},
    dateOfModification:{type:String,required:true},
    comments:[commentSchema],
    isArticleActive:{
        type:Boolean,required:true
    }
},{"strict":"throw"})

const Article=mongoose.model('article', articelSchema)
module.exports=Article
