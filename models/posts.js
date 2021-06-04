const mongoose =require("mongoose");


const postSchema=new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'      
    },
    //include the arrays of ids of all commment in post schema
    comments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'comment'
        }
    ],
    likes:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Like"
        }
    ]

},{
    timestamps:true
})

const Posts = mongoose.model('Post',postSchema);
module.exports=Posts;