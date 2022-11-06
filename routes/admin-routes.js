var router = require("express").Router()
var adminController = require("../controller/admin-func-controller")
router.get("/admindetails",adminController.getLoggedInAdmin)

module.exports = router