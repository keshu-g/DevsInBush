const { Router } = require("express");
const router = Router();

const authMiddleware = require("../middleware/authMiddleware");
const commentController = require("../controllers/commentController");
const { validationResultHandler } = require("../config/helper");
const { createCommentValidation, getCommentValidation } = require("../validation/commentValidator");
const { IdValidation } = require("../validation/anyValidator");

// router.get('/:id',authMiddleware, getCommentValidation, validationResultHandler(commentController.getAll));
router.post("", authMiddleware, createCommentValidation, validationResultHandler(commentController.createComment));
router.put("/:id", authMiddleware, createCommentValidation, validationResultHandler(commentController.updateComment));
router.delete("/:id", authMiddleware, IdValidation, validationResultHandler(commentController.deleteComment));

module.exports = router;
