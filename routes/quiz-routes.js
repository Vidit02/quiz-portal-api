var router = require("express").Router()
var categoryController = require("../controller/category-controller")

router.post("/addcategory",categoryController.addCategory)
router.get("/listcategory",categoryController.listAllCategory)
router.post("/getcategory",categoryController.getCategory)


module.exports = router