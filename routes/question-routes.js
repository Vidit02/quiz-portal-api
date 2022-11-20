const router = require("express").Router();
const quizController = require("../controller/question-controller")

router.post("/addquestion",quizController.addQuestion)
module.exports = router