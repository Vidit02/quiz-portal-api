var router = require("express").Router()

const RoleController = require("../controller/role-controller")
//  *      description: Use to add new roles
//  *      parameters: 
//  *          -in: path
//  *          name: rolename
//  *          schema: 
//  *              type: string
//  *          required: true
//  *          description: Rolename for user
//  *      responses:
//  *          '200': 
//  *              description: A successful response
//role urls
/**
 * @openapi
 * '/role/role':
 *  post:
 *    tags:
 *      - Roles
 *    summary: To add new Role
 *    parameters: 
 *      - name: roleName
 *        in: path
 *        required: true
 *        schema:
 *          type: String
 *    responses:
 *      200:
 *          description: success
 *      
 */
router.post("/role",RoleController.saveRole)

router.get("/role/:roleId",RoleController.getRoleById)
/**
 * @swagger
 * /role/roles:
 *  get:
 *      description : View all roles
 *      responses :
 *          '200' : 
 *              description : A successful response
 */
router.get("/roles",RoleController.getAllRoles)

module.exports = router