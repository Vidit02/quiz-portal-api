const router = require("express").Router();
const questionController = require("../controller/question-controller")

router.post("/addquestion",questionController.addQuestion)
router.post("/showquestions",questionController.listAllQuestions)
router.post("/getnumber",questionController.getCategoryNumber)
router.post("/getquestion",questionController.getQuestion)
router.post("/updatequestion",questionController.updateQuestion)
module.exports = router