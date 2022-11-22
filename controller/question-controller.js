const express = require("express")
const validator = require("validator")
const questionModel = require("../models/question.model")

function addQuestion(req,res) {
    let question = req.body.question
    let optionA = req.body.optionA
    let optionB = req.body.optionB
    let optionC = req.body.optionC
    let optionD = req.body.optionD
    let correctAns = req.body.correctAns
    let difficulty = req.body.difficulty
    let category = req.body.categoryId

    console.log("category id : " , category);
    let errors = {}
    let isError = false

    if(question == undefined || validator.isEmpty(question)){
        isError = true
        errors.questionError = "Please Enter Question"
    }
    if(optionA == undefined || validator.isEmpty(optionA)){
        isError = true
        errors.optionAError = "Please Enter Option A"
    }
    if(optionB == undefined || validator.isEmpty(optionB)){
        isError = true
        errors.optionBError = "Please Enter Option B"
    } else {
        if(optionB == optionA){
            isError = true
            errors.optionBError = "please enter new option"
        }
    }
    if(optionC == undefined || validator.isEmpty(optionC)){
        isError = true
        errors.optionCError = "Please Enter Option C"
    } else {
        if(optionC == optionA || optionC == optionB){
            isError = true
            errors.optionCError = "please enter new option"
        }
    }
    if(optionD == undefined || validator.isEmpty(optionD)){
        isError = true
        errors.questionError = "Please Enter Option D"
    } else {
        if(optionD == optionA || optionD == optionB || optionD == optionC){
            isError = true
            errors.optionDError = "please enter new option"
        }
    }
    if(isError) {
        res.json({
            status : 401 , 
            data : req.body,
            error : errors,
            msg : "Please Correct Errors"
        })
    } else {
        questionModel.findOne({"question" : question}, (err,success)=>{
            if(success){
                res.json({
                    status : 402, 
                    data : quesiton,
                    msg : "Question already exists"
                })
            } else {
                let questionobj = new questionModel({
                    "question" : question,
                    "optionA" : optionA,
                    "optionB" : optionB,
                    "optionC" : optionC,
                    "optionD" : optionD,
                    "category" : category,
                    "correctAns" : correctAns,
                    "difficulty" : difficulty
                })

                questionobj.save((err,success)=>{
                    if(err){
                        res.json({
                            status : 403,
                            msg : "Something is wrong",
                            data : "Please try again later"
                        })
                    } else {
                        res.json({
                            status : 200, 
                            msg : "Question added",
                            data : success
                        })
                    }
                })
            }
        })
    }
}

function listAllQuestions(req,res) {
    let categoryid = req.body.categoryId
    // let finalcat = "ObjectId(" + categoryid + ")"
    // console.log("final category : ", finalcat);
    questionModel.find({"category":categoryid}).exec((err,success)=>{
        if(err || err == null && success == null) {
            res.json({
                status : 401,
                msg : "Something is wrong"
            })
        } else {
            res.json({
                status : 200,
                msg : "Questions present",
                data : success
            })
        }
    })
}

module.exports.addQuestion = addQuestion
module.exports.listAllQuestions = listAllQuestions