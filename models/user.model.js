const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    firstName : String,
    lastName : String,
    emailId : String,
    password : String,
    mobNum : Number,
    role : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "role"
    }
});

module.exports = mongoose.model("User",UserSchema)