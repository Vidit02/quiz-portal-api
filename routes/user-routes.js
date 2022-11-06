var router = require("express").Router()
const userController = require("../controller/user-controller")


router.post("/signup",userController.signup)
router.post("/login",userController.login)
router.get("/loggedInDets",userController.getLoggedInUser)
router.post("/signupadmin",userController.signupadmin)

// const RoleController = require("./controller/role-controller")

// //role urls
// router.post("/role",RoleController.saveRole)
// router.get("/role/:roleId",RoleController.getRoleById)
// router.get("/roles",RoleController.getAllRoles)

module.exports = router