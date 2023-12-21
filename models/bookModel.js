const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },

    desc: {
        type: String,
    },

    authorName: {
        type: String,
        required: true,
    },

    publishedOn: {
        type: Date,
        default: new Date(),
    },

    createdAt: {
        type: Date,
        default: new Date()
    }

});


module.exports = mongoose.model("Book", BookSchema)