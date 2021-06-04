const Posts = require("../models/posts");
const Comment=require("../models/comment");

module.exports.create=function(req,res){

Posts.create({
    content:req.body.content,
    user:req.user._id
},function(err,post){
    if(err){
        console.log("error in a post",err);
        return;
    }

    if(req.xhr){

        req.flash("success","Posted Succesfully");
        return res.status(200).json({
            data:{
                post:post
            },
            message:"post created"
        })
    }

    return res.redirect("back");
})

}


module.exports.delete=async function(req,res){

    try{
  const post=await  Posts.findById(req.params.id);
        if(post.user==req.user.id){
            post.remove();

          const deletepost=  await Comment.deleteMany({post:req.params.id});

          if(req.xhr){
              return res.status(200).json({
                  data:{
                      post_id:req.params.id
                  },
                  message:"Post deleted Succesfully "
              })
          }

          req.flash("success","Post Deleted");
return res.redirect("/");
            }
        else{
            req.flash("error","You Cannot delete post")
            return res.redirect("back");
        }
    }catch(err){
        console.log("error-->",err);
    return;}



}


