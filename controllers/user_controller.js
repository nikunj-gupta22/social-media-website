const User = require("../models/user");
const path = require("path");
const fs = require("fs");

module.exports.profile = function (req, res) {
  User.findById(req.params.id, function (err, user) {
    let selfuser = false;
    if (user.id == req.user.id) {
      selfuser = true;
    }
    return res.render("profile", {
      title: "profile",
      name: user.name,
      email: user.email,
      edit: selfuser,
      avatar: user.avatar,
    });
  });
};

module.exports.posts = function (req, res) {
  return res.send("<h1>user posts</h1>");
};

module.exports.signin = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/user/profile");
  }

  return res.render("signin", {
    title: "signin",
  });
};

module.exports.signup = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/user/profile");
  }

  return res.render("signup", {
    title: "signup page",
  });
};

module.exports.create = function (req, res) {
  if (req.body.password != req.body.cpassword) {
    return res.redirect("back");
  }

  User.findOne({ email: req.body.email }, function (err, result) {
    if (err) {
      console.log("error is in signup", err);
      return;
    }

    if (!result) {
      User.create(req.body, function (err, user) {
        if (err) {
          console.log("error in finding user in signup");
          return;
        }

        return res.redirect("/user/signin");
      });
    } else {
      return res.redirect("back");
    }
  });
};

//sign-in and create a session for a user

module.exports.createSession = function (req, res) {
  //manual Authentication
  //   //find the user
  //    User.findOne({email:req.body.email},function(err,user){
  // if(err){
  // console.log("error in finding user in signup",err);
  //     return;
  // }

  //    //user found

  //   if(user){

  //  //handle password matching
  //  if(user.password !=req.body.password){
  //        return res.redirect('back');
  //  }
  //  //handle session
  // res.cookie("user_id",user.id);
  // return res.redirect("/user/profile");
  // }
  //          //user not found
  // else{
  //     return res.redirect("back");
  // }
  // });

  //passport Authentication
  req.flash("success", "Logged in Successfully");

  return res.redirect("/");
};

//signout

module.exports.signout = function (req, res) {
  req.logout();

  req.flash("success", "Signout Succesfully");

  return res.redirect("/");
};

module.exports.update = async function (req, res) {
  // if(req.user.id==req.params.id){
  //   User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
  //     return res.redirect("back");
  //   });
  // }
  // else{
  //   return res.status(401).send("Unauthorized");
  // }

  if (req.user.id == req.params.id) {
    try {
      let user = await User.findById(req.params.id);
      User.uplodedAvatar(req, res, function (err) {
        if (err) {
          console.log("multer*** Error", err);
        }

        user.name = req.body.name;

        if (req.file) {
          if (user.avatar) {
            if (fs.existsSync(path.join(__dirname, "..", user.avatar))) {
              fs.unlinkSync(path.join(__dirname, "..", user.avatar));
            }
          }

          user.avatar = User.AvatarPath + "/" + req.file.filename;
        }

        user.save();
        return res.redirect("back");
      });
    } catch (err) {
      req.flash("error", err);
      return res.redirect("back");
    }
  }
};
