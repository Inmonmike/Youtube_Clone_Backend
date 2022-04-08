const mongoose = require("mongoose")
const Joi = require("joi");
const { string, number } = require("joi");
const { commentSchema } = require("./comment");


const replySchema = new mongoose.Schema({
    name: {type: String, required: true, minlength: 2, maxlength: 35},
    userComment: {type: String, required: true, minlength: 1, maxlength: 255},
    likes: {type: Number, default: 0},
    dislikes: {type: Number, default: 0},
    videoId: {type: [commentSchema], default: [] },
    dateAdded: { type: Date, default: Date.now()},
});

const Reply = mongoose.model("Relpy",replySchema);

function validateReply(reply) {
    const schema = Joi.object({
        name: Joi.string().required(),
        userComment: Joi.string().required(),

    });
    return schema.validate(reply);
}
module.exports = {
    replySchema,
    Reply,
    validateReply,
};
