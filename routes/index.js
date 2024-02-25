const router = require("express").Router();

const userRouter = require("./user");
const categoryRouter = require("./category")
const productRouter = require("./product")

router.use("/user", userRouter);
router.use("/category",categoryRouter)
router.use("/product",productRouter)

module.exports = router;
