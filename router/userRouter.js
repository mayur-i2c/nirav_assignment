const router = require("express").Router();
const {singleFileUpload} =require("../utils/imageUpload");
const {adduserController,getuserController,updateuserController,deleteuserController}=require("../controller/userController")

router.post("/add",singleFileUpload("public/images",["image/png","image/jpeg","image/jpg"],1024*1024,"image"),adduserController)

router.get("/all",getuserController)

router.put("/update/:id",singleFileUpload("public/images",["image/png","image/jpeg","image/jpg"],1024*1024,"image"),updateuserController);

router.delete("/delete/:id",deleteuserController)

module.exports=router