const express=require("express");
const route=express.Router();
const userController=require("../controllers/user_controller");
const passport=require("passport");

route.get('/profile/:id',passport.checkAuthentication,userController.profile);

route.get('/posts',userController.posts);

route.get('/signin',userController.signin);

route.get('/signup',userController.signup);

route.post('/createuser',userController.create);

route.post('/createsession',passport.authenticate('local',
{failureRedirect:"/user/signin"}),userController.createSession);

route.get("/signout",userController.signout);

route.post("/update/:id",userController.update);


route.get("/auth/google",passport.authenticate('google',{scope:['profile','email']}));
route.get("/auth/google/callback",passport.authenticate('google',{failureRedirect:"user/signin"}),userController.createSession);


module.exports=route;