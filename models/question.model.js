const mongoose = require("mongoose")

const QuestionSchema = new mongoose.Schema({
    question : String,
    optionA : String,
    optionB : String,
    optionC : String,
    optionD : String,
    correctAns : String,
    difficulty : Number,
    category : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "title"
    }
});

module.exports = mongoose.model("Questions",QuestionSchema)