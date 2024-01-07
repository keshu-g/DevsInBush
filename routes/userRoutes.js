const { Router } = require('express');
const router = Router();

const userController = require("../controllers/userContoller");
const { validationResultHandler } = require('../config/helper');
const { createUserValidation } = require("../validation/userValidator");

router.get('/getAll', userController.getAll);
router.get('/getById/:id', userController.getById);

router.post('/create', createUserValidation, validationResultHandler(userController.create));
router.put('/update/:id', createUserValidation, validationResultHandler(userController.update));

module.exports = router;
