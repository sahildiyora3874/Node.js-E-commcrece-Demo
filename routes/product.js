const router = require("express").Router()
const{createProductController,getProductController,putProductController,deleteProductController} = require("../controller/product-controller")

router.post("/create",createProductController)
router.get("/get/:id",getProductController)
router.put("/put/:id",putProductController)

router.delete("/delete/:id",deleteProductController)


module.exports = router