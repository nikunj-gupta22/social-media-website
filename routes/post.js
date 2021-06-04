const express=require("express");
const route=express.Router();
const passport=require("passport");
const post_controller=require("../controllers/post_controller");

route.post("/create",passport.checkAuthentication,post_controller.create);

route.get("/destroy/:id",passport.checkAuthentication,post_controller.delete);


module.exports=route;