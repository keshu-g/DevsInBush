const { Router } = require('express');
const router = Router();

const commentController = require("../controllers/commentController");
const { validationResultHandler } = require('../config/helper');
const { createCommentValidation, getCommentValidation } = require("../validation/commentValidator");

router.get('/getAll/:id', getCommentValidation, validationResultHandler(commentController.getAll));
router.post('/create', createCommentValidation, validationResultHandler(commentController.create));

module.exports = router;