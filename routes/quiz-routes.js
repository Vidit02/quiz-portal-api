var router = require("express").Router()
var quizController = require("../controller/quiz-controller")

router.post("/addquiz",quizController.addQuiz)
router.get("/listquiz",quizController.listAllQuizzes)
router.post("/deletequiz",quizController.deleteQuiz)

module.exports = router