const validator = require("validator")
const userModel = require("../models/user.model")
const bcrypt = require("bcrypt")

function signup(req, res) {
    let firstName = req.body.firstName
    let lastName = req.body.lastName
    let emailId = req.body.emailId
    let password = req.body.password
    let mobNum = req.body.mobNum
    let role = "636182fc7d9d797482be4d76"
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)

    let errors = {}
    let isError = false
    let passregex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/

    if (firstName == undefined || validator.isEmpty(firstName)) {
        isError = true
        errors.firstNameError = "Please Enter Firstname"
    }

    if (lastName == undefined || validator.isEmpty(lastName)) {
        isError = true
        errors.lastNameError = "Please Enter Lastname"
    }

    if (emailId == undefined || !validator.isEmail(emailId)) {
        isError = true
        errors.emailIdError = "Please Enter Email in correct Format"
    }

    if (password == undefined || !passregex.test(password)) {
        isError = true
        errors.passwordError = "Should Contain 1 Capital,1 Small,1 Number & 1 Special Char"
    } else {

    }

    if (isError) {
        res.json({
            status: 401,
            data: req.body,
            error: errors,
            msg: "Please Correct All errors"
        })
    } else {
        let user = new userModel({
            "firstName": firstName,
            "lastName": lastName,
            "emailId": emailId,
            "password": hash,
            "mobNum": mobNum,
            "role": role

        })
        user.save(function (err, success) {
            if (err) {
                res.json({
                    status: 402,
                    msg: "Something is wrong",
                    data: req.body
                })
            } else {
                res.json({
                    msg: "Signup done...",
                    status: 200,
                    data: success
                })
            }
        })
    }
}


module.exports.signup = signup