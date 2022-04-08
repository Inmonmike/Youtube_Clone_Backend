const {Comment, validateComment} = require("../models/comment")
const express = require("express");
const router = express.Router();

//POST a new comment
//http://localhost:3011/api/comments
router.post("/", async (req, res)=>{
    try {
        const {error} = validateComment(req.body)
        if (error) 
        return res
        .status(400)
        .send(error);

        let newComment = new Comment(req.body)
        await newComment.save()
        return res
        .status(201)
        .send(newComment)        
    } catch (error) {
        return res.status(500).send(`Internal Server Error: ${error}`);
        
    }
})

//GET a comment by id
//http://localhost:3011/api/comments/:commentId
router.get("/:commentId", async (req, res)=>{
    try {
        let comment = await Comment.findById(req.params.commentId);
        if (!comment)
            return res
            .status(400)
            .send(`Product with Id of ${req.params.commentId} does not exist!`);
        return res
        .status(200)
        .send(comment);       
    } catch (error) {
        return res
        .status(500)
        .send(`Internal Server Error: ${error}`);        
    }
})

module.exports = router