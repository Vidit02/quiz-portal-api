var router = require("express").Router()
var categoryController = require("../controller/category-controller")

router.post("/addcategory",categoryController.addCategory)
router.get("/listcategory",categoryController.listAllCategory)
router.post("/getcategory",categoryController.getCategory)
router.post("/updatecategory",categoryController.updateCategory)
router.post("/deletecategory",categoryController.deleteCategory)
router.get("/gettitlelist",categoryController.getTitleList)


module.exports = router