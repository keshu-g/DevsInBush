const { Router } = require("express");
const router = Router();

const authMiddleware = require("../middleware/authMiddleware");
const userController = require("../controllers/userContoller");
const { IdValidation } = require("../validation/anyValidator");
const { validationResultHandler } = require("../helper/commonHelper");
const { createUserValidation, loginValidator } = require("../validation/userValidator");

router.get("", userController.getAll);
router.get("/profile", authMiddleware, userController.getUserProfile);
router.get("/:id", IdValidation, validationResultHandler(userController.getById));

router.post("", createUserValidation, validationResultHandler(userController.createUser));
router.put("", authMiddleware, createUserValidation, validationResultHandler(userController.updateUser));
router.delete("", authMiddleware, userController.deleteUser);

router.post("/login", loginValidator, validationResultHandler(userController.login));

module.exports = router;
