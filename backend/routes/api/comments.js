/**
 * @route GET /post/:postId
 * @group Comments - Operations about comments
 * @param {string} postId.path.required - ID of the post to retrieve comments for
 * @returns {Array.<Comment>} 200 - An array of comments
 * @returns {Error} 500 - Failed to fetch comments
 * @description Get all comments for a specific post.
 */

/**
 * @route DELETE /:commentId
 * @group Comments - Operations about comments
 * @param {string} commentId.path.required - ID of the comment to delete
 * @returns {object} 200 - { message: "Comment deleted successfully" }
 * @returns {Error} 404 - Comment not found
 * @returns {Error} 500 - Failed to delete comment
 * @description Delete a comment by its ID.
 */
const router = require("express").Router();
const mongoose = require("mongoose");
const Comment = mongoose.model("Comment");

module.exports = router;
// Hey GitHub Copilot, please help me write a route to get all comments for a specific post
router.get("/post/:postId", async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.postId });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch comments" });
  }
});
//add another endpoint for deleting a comment
router.delete("/:commentId", async (req, res) => {
    try {
        const deletedComment = await Comment.findByIdAndDelete(req.params.commentId);
        if (!deletedComment) {
            return res.status(404).json({ error: "Comment not found" });
        }
        res.json({ message: "Comment deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete comment" });
    }
});