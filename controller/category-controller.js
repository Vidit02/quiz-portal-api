const express = require("express")
const categoryModel = require("../models/category.model")

function addCategory(req,res){
    let title = req.body.title
    let description = req.body.description
    let type = req.body.type

    let error = {}
    let isError = false

    if(title == undefined || title == ""){
        isError = true
        error.titleError = "Please Enter Title"
    }
    if(description == undefined || description == ""){
        isError = true
        error.descError = "Please Enter Description"
    }
    if(type == undefined || type == ""){
        isError = true
        error.typeError = "Please Enter Type"
    }
    if(isError){
        res.json({
            status : 401,
            data : req.body,
            msg : "Please Correct Errors",
            error : error
        })
    } else {
        categoryModel.findOne({"title" : title},(err,success) => {
            if(success) {
                res.json({
                    status : 402,
                    msg : "Category Already Exist",
                    data : title
                })
            } else {
                let category = new categoryModel({
                    "title" : title,
                    "description" : description,
                    "type" : type
                })
                category.save(function(err,success){
                    if(err){
                        res.json({
                            status : 403,
                            msg : "Something went wrong",
                            data : req.body
                        })
                    } else {
                        res.json({
                            msg : "Category Saved",
                            status : 200,
                            data : success
                        })
                    }
                })
            }
        })
    }
}

function listAllCategory(req,res){
    categoryModel.find().exec((err,success)=>{
        if(err || err == null && success == null){
            res.json({
                status : 401,
                msg : "Something is wrong"
            })
        } else {
            res.json({
                status : 200,
                msg : "Categories present",
                data : success
            })
        }
    })
}

function getCategory(req,res){
    let title = req.body.title
    // console.log(title);
    categoryModel.findOne({"title":title},(err,success)=>{
        console.log(err);
        if(err){
            res.json({
                status : 401,
                msg : "Something is Wrong",
                data : req.body
            })
        } else {
            res.json({
                status : 200,
                data : success,
                msg : "Category Found"
            })
        }
    })
}

module.exports.addCategory = addCategory
module.exports.listAllCategory = listAllCategory
module.exports.getCategory = getCategory