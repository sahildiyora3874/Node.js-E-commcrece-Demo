const router = require("express").Router()
const {signupUserController,loginUserController}= require("../controller/user-controller");
const verifyToken = require("../middleware/auth")



router.post("/signup",signupUserController)
router.post("/login",verifyToken,loginUserController) 
router.post("/reset-password",loginUserController)
        
router.use(verifyToken);



module.exports = router