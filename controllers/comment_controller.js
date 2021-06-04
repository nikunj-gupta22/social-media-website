const comment=require("../models/comment");
const Post=require("../models/posts");
const commentMailer=require("../mailer/comment_mailer");


module.exports.create=async function(req,res){
try{
const post=await Post.findById(req.body.post_id);
    if(post){
        comment.create({
            content:req.body.content,
            post:req.body.post_id,
            user:req.user._id
        },async function(err,comment){
            if(err){
                console.log("error in creating a comment");
                return;
            }

console.log("my post is",post);

        console.log("my comment is",comment);
            post.comments.push(comment);
            post.save();

          comment=  await comment.populate('user',"name email").execPopulate();
          commentMailer.newComment(comment);
          return  res.redirect("/");

        })
    }

}catch(err){
    console.log("error",err);
}


}


module.exports.destroy=function(req,res){

comment.findById(req.params.id,function(err,usercomment){
console.log("ina delete comment");
    if(req.user.id==usercomment.user){
        console.log("in a delete comment match");
    let postId=usercomment.post;
    usercomment.remove(); 
    
    Post.findByIdAndUpdate(postId,{$pull:{comments:req.params.id}},function(err,post){
        return res.redirect("back");
    })

}else{
    return res.redirect("back");
}

})


}