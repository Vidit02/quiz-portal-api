const mongoose = require("mongoose")

const QuizSchema = new mongoose.Schema({
    title : String,
    description : String,
    sectiontitle : Array,
    sectionnum : Array,
    sectiontime : Array,
    status : Boolean
});

module.exports = mongoose.model("Quizzes",QuizSchema)