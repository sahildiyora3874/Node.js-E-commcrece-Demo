const router =  require("express").Router()
const {createCategoryController,getCategoryController,coustmizeCategoryController,deleteCategoryController} = require("../controller/category-controller")

router.post("/create",createCategoryController)
router.get("/get/:id",getCategoryController)
router.put("/coustmize",coustmizeCategoryController)
router.delete("/delete",deleteCategoryController)

module.exports = router