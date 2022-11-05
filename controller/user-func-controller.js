const validator = require("validator")
const express = require('express');


function getLoggedInUser(req,res){
    res.json({
        "data" : "This is success",
        "user" : {
            "firstname" : req.user.firstName,
            "emailId" : req.user.emailId,
            "role" : req.user.role.roleName
        }
    })
}

module.exports.getLoggedInUser = getLoggedInUser