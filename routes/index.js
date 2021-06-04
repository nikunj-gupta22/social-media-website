const express=require("express");
const router=express.Router();
const home_controller=require("../controllers/home_controller");
const passport=require("passport");

router.get('/',home_controller.home);
router.use('/user',require("./user"));
router.use("/post",require("./post"));
router.use("/comment",require("./comment"));
router.use("/likes",require("./likes"));
router.use("/api",require("./api"));



module.exports=router;