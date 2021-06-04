const mongoose=require("mongoose");

const likeSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.ObjectId
    },
    //this define the ObjectId of liked object
    likeable:{
        type:mongoose.Schema.ObjectId,
        require:true,
        refPath:"onModel"
    },
    //this field is used for defining the type of liked object since this is  a dynamic refrence

    onModel:{
        type:String,
        required:true,
        enum:['Post','Comment']
    }

},{
    timestamps:true
})


const Like=mongoose.model('Like',likeSchema);

module.exports=Like
