var router = require("express").Router()
var userController = require("../controller/user-func-controller")
router.get("/userdetails",userController.getLoggedInUser)

module.exports = router