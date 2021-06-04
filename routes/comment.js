const express=require("express");
const route=express.Router();
const passport=require("passport");
const comment_controller=require("../controllers/comment_controller");
route.post("/create",passport.checkAuthentication,comment_controller.create);
route.get("/destroy/:id",passport.checkAuthentication,comment_controller.destroy);
module.exports=route;