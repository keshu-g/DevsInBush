const { Router } = require('express');
const router = Router();

const postController = require("../controllers/postContoller");
const { validationResultHandler } = require('../config/helper');
const { createPostValidation } = require("../validation/postValidator");
const { IdValidation, LikeValidation } = require("../validation/anyValidator");

router.get('/getAll', postController.getAll);
router.get('/getById/:id', IdValidation, validationResultHandler(postController.getById));

router.post('/create', createPostValidation, validationResultHandler(postController.create));
router.put('/update/:id', createPostValidation, validationResultHandler(postController.update));
router.delete('/delete/:id', IdValidation, validationResultHandler(postController.deletee));

router.post('/like/:id', LikeValidation, validationResultHandler(postController.likePost));

module.exports = router;