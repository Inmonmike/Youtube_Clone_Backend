const {Comment, validateComment} = require("../models/comment")
const {Reply, validateReply} = require("../models/reply");
const express = require("express");
const router = express.Router();

//GET all comments
//http://localhost:3011/api/comments
router.get("/", async (req, res)=>{
    try {
        let comments = await Comment.find();
        if (!comments)
            return res
            .status(400)
            .send("No comments for this video!")
        return res
        .status(200)
        .send(comments);        
    } catch (error) {
        return res
        .status(500)
        .send(`Internal Server Error: ${error}`);
        
    }
})

//GET a comment by videoid
//http://localhost:3011/api/comments/:videoId
router.get("/:videoId", async (req, res)=>{
    try {
        let comment = await Comment.find (req.params, {}, { _id: 0, videoId: 1});
        if (!comment)
            return res
            .status(400)
            .send(`Comment with Id of ${req.params.videoId} does not exist!`);
        return res
        .status(200)
        .send(comment);       
    } catch (error) {
        return res
        .status(500)
        .send(`Internal Server Error: ${error}`);        
    }
})



//PUT an existing comment
//http://localhost:3011/api/comments/:commentId
router.put("/:commentId", async (req, res)=>{
    try {
        const {error} = validateComment(req.body);
        if (error) return res.status(400).send(error);

        let comment = await Comment.findByIdAndUpdate(
            req.params.commentId,
            req.body,
            {new: true}
        );
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

//PUT an comment like
//http://localhost:3011/api/comments/:commentId/commentLike
router.put("/:commentId/commentLike", async (req, res)=>{
    try {
        let comment = await Comment.findById(req.params.commentId);
        if (!comment)
         return res
         .status(400)
         .send(`Comment with Id of ${req.params.commentId} does not exist!`);

         comment.likes++;
         await comment.save();

         return res
         .status(200)
         .send(comment);        
    } catch (error) {
        return res
        .status(500)
        .send(`Internal Server Error: ${error}`);
        
    }
})
//PUT an comment dislike
//http://localhost:3011/api/comments/:commentId/commentDisLike
router.put("/:commentId/commentDisLike", async (req, res)=>{
    try {
        let comment = await Comment.findById(req.params.commentId);
        if (!comment)
         return res
         .status(400)
         .send(`Comment with Id of ${req.params.commentId} does not exist!`);

         comment.dislikes++;
         await comment.save();

         return res
         .status(200)
         .send(comment);        
    } catch (error) {
        return res
        .status(500)
        .send(`Internal Server Error: ${error}`);
        
    }
})

//PUT an existing reply
//http://localhost:3011/api/comments/:commentId/newReply
router.put("/:commentId/newReply", async (req, res)=>{
    try {
        
        let comment = await Comment.findById(req.params.commentId);
        if (!comment)
         return res
         .status(400)
         .send(`Comment with Id of ${req.params.commentId} does not exist!`);

         let newReply = new Reply({
             name: req.body.name,
             userComment: req.body.userComment
         })
         console.log(newReply)
         comment.replies.push(newReply)
         await comment.save()
         return res
         .status(201)
         .send(comment)       

   
    } catch (error) {
        return res
        .status(500)
        .send(`Internal Server Error: ${error}`);        
    }
})

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

module.exports = router