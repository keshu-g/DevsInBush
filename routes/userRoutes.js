const { Router } = require('express');
const router = Router();

const authMiddleware = require("../middleware/authMiddleware")
const userController = require("../controllers/userContoller");
const { IdValidation } = require("../validation/anyValidator");
const { validationResultHandler } = require('../config/helper');
const { createUserValidation, loginValidator } = require("../validation/userValidator");

router.get('', userController.getAll);
router.get('/profile', authMiddleware, userController.getProfile);
router.get('/:id', IdValidation, validationResultHandler(userController.getById));

router.post('', createUserValidation, validationResultHandler(userController.create));
router.put('', authMiddleware, createUserValidation, validationResultHandler(userController.update));
router.delete('', authMiddleware, userController.deletee);

router.post('/login', loginValidator, validationResultHandler(userController.login));

module.exports = router;