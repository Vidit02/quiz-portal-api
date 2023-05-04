const express = require("express")
const quizModel = require("../models/quiz.model")

function addQuiz(req,res){
    let title = req.body.title
    let description = req.body.description
    let sectiontitle = req.body.sectiontitle
    let sectionnum = req.body.sectionnum
    let sectiontime = req.body.sectiontime
    let status = false

    let error = {}
    let isError = false

    if(title == undefined || title == ""){
        isError = true
        error.titleError = "Please Enter Title"
    }
    if(description == undefined || description == ""){
        isError = true
        error.descriptionError = "Please Enter Description"
    }
    if(sectiontitle == undefined || sectiontitle == ""){
        isError = true
        error.sectiontitleError = "Please Enter a Section"
    }
    if(sectionnum == undefined || sectionnum == ""){
        isError = true
        error.sectionNumberError = "Please Enter Number of Section"
    }
    if(sectiontime == undefined || sectiontime == ""){
        isError = true
        error.sectionTimeError = "Please Enter Max Time"
    }
    if(isError){
        res.json({
            status : 401,
            data : req.body,
            error : error,
            msg : "Please Correct Errors"
        })
    } else {
        quizModel.findOne({"title":title},(err,success)=>{
            if(success){
                res.json({
                    status : 402,
                    msg : "Quiz Already Exist",
                    data : title
                })
            } else {
                let quiz = new quizModel({
                    "title" : title,
                    "description" : description,
                    "sectionnum" : sectionnum,
                    "sectiontitle" : sectiontitle,
                    "sectiontime" : sectiontime,
                    "status" : status
                })
                quiz.save((err,success)=>{
                    if(err){
                        res.json({
                            status : 402,
                            msg : "Something Went Wrong",
                            data : req.body
                        })
                    } else {
                        res.json({
                            status : 200 ,
                            msg : "Quiz Saved",
                            data : success
                        })
                    }
                })
            }
        })
    }
}

function listAllQuizzes(req,res){
    quizModel.find().exec((err,success) => {
        if(err || err == null && success == null) {
            res.json({
                status : 401,
                msg : "Something is wrong"
            })
        } else {
            res.json({
                status : 200,
                msg : "Quizzes present",
                data : success
            })
        }
    })
}

function deleteQuiz(req,res){
    let id = req.body.id
    quizModel.deleteOne({"_id" : id},(err,success)=>{
        if (err) {
            console.log(err);
            res.json({
                status: 403,
                msg: "Something went wrong",
                data: req.body
            })
        } else {
            res.json({
                msg: "Category deleted",
                status: 200,
                data: success
            })
        }
    })
}

function findQuiz(req,res){
    let id = req.body.id
    quizModel.findOne({"_id" : id},(err,success)=>{
        if (err) {
            console.log(err);
            res.json({
                status : 403,
                msg : "Something is wrong",
                data : req.body
            })
        } else {
            res.json({
                status : 200,
                msg : "Quiz Found",
                data : success
            })
        }
    })
}

function updateQuiz(req,res){
    let id = req.body.id
    let title = req.body.title
    let description = req.body.description
    let sectiontitle = req.body.sectiontitle
    let sectionnum = req.body.sectionnum

    quizModel.findOne({"_id":id},(err,success)=>{
        if (err) {
            res.json({
                status : 402,
                msg : "Something went wrong"
            })
        } else {
            console.log(success);
            let quiz = {$set : {"description":description,"sectiontitle":sectiontitle,"sectionnum":sectionnum}}
            quizModel.updateOne({"_id":id},quiz,(err,suc)=>{
                if (err) {
                    res.json({
                        status : 403,
                        msg : "Something went wrong",
                        data : req.body
                    })
                } else {
                    res.json({
                        status : 200,
                        data : suc,
                        msg : "Quiz Saved"
                    })
                }
            })
        }
    })
}

function updateQuizStatus(req,res){
    let id = req.body.id
    let statusquiz = req.body.status
    quizModel.findOne({"_id" : id},(err,succ)=>{
        if (err) {
            res.json({
                status : 402,
                msg : "Something is wrong",
                data : req.body
            })
        } else {
            let quiz = {$set : {"status":statusquiz}}
            quizModel.updateOne({"_id" : id},quiz,(err,success)=>{
                if (err) {
                    res.json({
                        status : 403,
                        msg : "Something went wrong",
                        data : req.body
                    })
                } else {
                    res.json({
                        status : 200,
                        data : success,
                        msg : "Quiz updated"
                    })
                }
            })
        }
    })
}

function getAllActiveQuizzes(req,res){
    quizModel.find({"status" : true }).exec((err,success) => {
        if(err || err == null && success == null) {
            res.json({
                status : 401,
                msg : "Something is wrong"
            })
        } else {
            res.json({
                status : 200,
                msg : "Quizzes present",
                data : success
            })
        }
    })
}

module.exports.addQuiz = addQuiz
module.exports.listAllQuizzes = listAllQuizzes
module.exports.deleteQuiz = deleteQuiz
module.exports.findQuiz = findQuiz
module.exports.updateQuiz = updateQuiz
module.exports.updateQuizStatus = updateQuizStatus
module.exports.getAllActiveQuizzes = getAllActiveQuizzes