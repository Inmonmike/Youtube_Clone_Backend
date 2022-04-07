const mongoose = require("mongoose")
const Joi = require("joi");
const { string } = require("joi");

const commentSchema = new mongoose.Schema({
    name: {type: String, required: true, minlength: 2, maxlength: 35},
    userComment: {type: String, required: true, minlength: 1, maxlength: 255},
    dateAdded: { type: Date, default: Date.now()},
});

function validateComment(comment){
    const schema = Joi.object({
        name: Joi.string().min(2).max(35).required(),
        userComment: Joi.string.min(1).maxlength(255).required(),

    })
    return schema.validate(comment);
}

const Comment = mongoose.model("Comment", commentSchema)

module.exports = {
    Comment,
    validateComment
};