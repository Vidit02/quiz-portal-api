const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const userrouter = require("./routes/user-routes")
const rolerouter = require("./routes/role-routes")
const userfuncrouter = require("./routes/user-func-routes")
const adminfuncrouter = require("./routes/admin-routes")
const quizrouter = require("./routes/quiz-routes")
const swaggerJsDoc = require("swagger-jsdoc")
const swaggerUi = require("swagger-ui-express")
const passport = require("passport")
const jwt = require("jsonwebtoken")
require("./passport-js")


let app = express()
//Written from url :  https://swagger.io/specification/#infoObject
const swaggerOptions = {
    swaggerDefinition : {
        info : {
            title : 'Quiz Portal API',
            description : "API for Quiz Portal",
            contact :{
                name : "Vidit Gandhi"
            },
            servers : ["http://localhost:9898"]
        }
    },
    apis : ["./routes/*.js"]
}

const swaggerDocs = swaggerJsDoc(swaggerOptions)
app.use('/api-docs',swaggerUi.serve , swaggerUi.setup(swaggerDocs))

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(passport.initialize())

app.use("/auth",userrouter)
app.use("/role",rolerouter)

// app.get("/protected",passport.authenticate('jwt',{session : false}),(req,res)=>{
//     res.json({
//         success : true,
//         user : req.user
//     })
// })

app.use("/user",passport.authenticate('jwt',{session:false}),userfuncrouter)
app.use("/admin",passport.authenticate('jwt',{session:false}),adminfuncrouter)
app.use("/admin",passport.authenticate('jwt',{session:false}),quizrouter)
let port = 9898

mongoose.connect('mongodb://localhost:27017/quizportal',function(err){
    if(err) {
        console.log("db not connected");
    } else {
        console.log("db connected");
    }
})

app.listen(port,function(){
    console.log("Server started on port : " + port);
})