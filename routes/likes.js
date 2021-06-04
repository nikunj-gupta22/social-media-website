const express=require("express");

const router=express.Router();
const like_controller=require("../controllers/like_controller");


router.post("/toggle",like_controller.togglelike);



module.exports=router;