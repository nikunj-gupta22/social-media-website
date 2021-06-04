const Posts = require("../models/posts");
const Users=require("../models/user");
module.exports.home=async function(req,res){

//     Posts.find({}).populate('user').populate({
//         path:"comments",
//         populate:{
//             path:"user"
//         }
//     }).exec(function(err,posts){
    
//         Users.find({},function(err,users){
            
//             return res.render('home',{
//                 title:"home",
//                 posts:posts,
//                 all_users:users
//         });

  // })
     
    //   })
    try{
let post=await Posts.find({}).sort("-createdAt").populate("user").populate({
    path:"comments",
    populate:{
        path:"user"
      }
 });

const users=await Users.find({});

return res.render('home',{
                     title:"home",
                     posts:post,
                    all_users:users
             });

    }catch(err){
        console.log("error is",err);
    }


}