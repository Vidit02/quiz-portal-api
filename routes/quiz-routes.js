var router = require("express").Router()
var categoryController = require("../controller/category-controller")

router.post("/addcategory",categoryController.addCategory)

module.exports = router