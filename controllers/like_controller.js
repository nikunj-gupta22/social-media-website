const Like=require("../models/like");
const Post=require("../models/comment");
const Comment=require("../models/comment");


module.exports.togglelike=async function(req,res){
    try{

//like/toogle?id="abcd"&type="mkd"

let likable;
let deleted=false;

if(req.query.type=="Post"){

 likable = await Post.findById(req.query.id).populate('likes')

}else{

likeable=await (await Comment.findById(req.query.id)).populated('likes');
}

//check if like already exists


let existingLike=await Like.findOne({
    likeable:req.query.id,
    onModel:req.query.type,
    user:req.user._id
})

//if a like already exists then delete like 

if(existingLike){

    likeable.likes.pull(existingLike._id);
    likeable.save();
    existingLike.remove();
    deleted=true;

}
else{
//make a new like
let newlike=await Like.create({
    user:req.user._id,
    likeable:req.query.id,
    onModel:req.query.type
});

likeable.likes.push(newlike._id);

likeable.save();





}
return res.json(200,{
    message:"Request Succesfull",
    data:{
        deleted:deleted
    }
})

    }catch(err){
        console.log(err);
        return res.json(500,{
            message:"Internal server Error"
        })
    }
}