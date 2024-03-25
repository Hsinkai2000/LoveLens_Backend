const { Schema } = require("mongoose");
const mongoose = require("mongoose");

const imageSchema = new Schema({
    imageURL: String,
});

const Image = mongoose.model("Image", imageSchema);

module.exports = Image;
