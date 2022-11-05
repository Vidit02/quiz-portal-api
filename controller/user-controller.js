const validator = require("validator")
const express = require('express');
const router = express.Router()
const userModel = require("../models/user.model")
const middleware = require("../middlewares")
const bcrypt = require("bcrypt")

const jwt = require('jsonwebtoken')
const tokenSecret = "my-token-secret"

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
    }



    if (isError) {
        res.json({
            status: 401,
            data: req.body,
            error: errors,
            msg: "Please Correct All errors"
        })
    } else {
        userModel.findOne({ "emailId": emailId }, (err, success) => {
            if (success) {
                res.json({
                    status: 402,
                    data: emailId,
                    msg: "Email Already Exists"
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
        })

    }
}

function login(req, res) {
    let emailId = req.body.emailId
    let password = req.body.password

    if (emailId == "" || password == "") {
        res.json({
            status: 402,
            msg: "Something is wrong",
            data: req.body
        })
    } else {


        userModel.findOne({ "emailId": emailId }).populate("role").exec(function (err, success) {
            if (err || err == null && success == null) {
                res.json({
                    status: 402,
                    msg: "Something is wrong",
                    data: req.body
                })
            } else {
                // res.json({
                //     status: 200,
                //     msg: "User Found",
                //     data: success
                // })
                bcrypt.compare(password, success.password, function (err, result) {
                    if(err){
                        res.json({
                            status: 404,
                            msg: "Something is wrong",
                            data: req.body
                        })
                    }
                    if (result) {
                        const payload = {
                            id : success._id,
                            firstName : success.firstName,
                            lastName : success.lastName,
                            emailId : success.emailId,
                            role : success.role
                        }
                        const token = jwt.sign(payload, tokenSecret)
                        res.json({
                            status: 200,
                            msg: "User Found",
                            token: "Bearer " + token
                        })
                    } else {
                        res.json({
                            status: 401,
                            msg: "Invalid Credentials",
                            data: "Please try again"
                        })
                    }
                })
            }

        })
    }

    // console.log(bcrypt.compareSync(password,"$2b$10$0VXGOQHHmBVVW/qbgc9VjudmoomUOAqFi7ElGZy14u.T7NYi3llA6"));
}

function getLoggedInUser(req,res){

}
module.exports.signup = signup
module.exports.login = login
module.exports.getLoggedInUser = getLoggedInUser