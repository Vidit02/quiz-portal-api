const mongoose = require("mongoose")

const CategorySchema = new mongoose.Schema({
    title : String,
    description : String,
    type : String
});

module.exports = mongoose.model("Category",CategorySchema)