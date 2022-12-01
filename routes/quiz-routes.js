var router = require("express").Router()
var quizController = require("../controller/quiz-controller")

router.post("/addquiz",quizController.addQuiz)
router.get("/listquiz",quizController.listAllQuizzes)
router.post("/deletequiz",quizController.deleteQuiz)
router.post("/getquiz",quizController.findQuiz)
router.post("/updatequiz",quizController.updateQuiz)
router.post("/updatequizstatus",quizController.updateQuizStatus)

module.exports = router