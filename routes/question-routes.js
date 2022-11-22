const router = require("express").Router();
const quizController = require("../controller/question-controller")

router.post("/addquestion",quizController.addQuestion)
router.post("/showquestions",quizController.listAllQuestions)
module.exports = router