const { Router } = require('express');
const router = Router();

const userController = require("../controllers/userContoller");
const { validationResultHandler } = require('../config/helper');
const { createUserValidation } = require("../validation/userValidator");
const { IdValidation } = require("../validation/anyValidator");

router.get('/getAll', userController.getAll);
router.get('/getById/:id', IdValidation, validationResultHandler(userController.getById));

router.post('/create', createUserValidation, validationResultHandler(userController.create));
router.put('/update/:id', createUserValidation, validationResultHandler(userController.update));
router.delete('/delete/:id', IdValidation, validationResultHandler(userController.deletee));

module.exports = router;
