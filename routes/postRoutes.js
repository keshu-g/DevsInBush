const { Router } = require('express');
const router = Router();

const authMiddleware = require("../middleware/authMiddleware")
const postController = require("../controllers/postContoller");
const { validationResultHandler } = require('../config/helper');
const { createPostValidation } = require("../validation/postValidator");
const { IdValidation, LikeValidation } = require("../validation/anyValidator");

router.get('', postController.getAll);
router.get('/:id', IdValidation, validationResultHandler(postController.getById));

router.post('', authMiddleware, createPostValidation, validationResultHandler(postController.create));
router.put('/:id', authMiddleware, createPostValidation, validationResultHandler(postController.update));
router.delete('/:id', authMiddleware, IdValidation, validationResultHandler(postController.deletee));

router.post('/like/:id', authMiddleware, LikeValidation, validationResultHandler(postController.likePost));

module.exports = router;