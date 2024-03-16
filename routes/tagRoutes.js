const { Router } = require("express");
const router = Router();

const authMiddleware = require("../middleware/authMiddleware");
const tagController = require("../controllers/tagContoller");
const { IdValidation } = require("../validation/anyValidator");
const { validationResultHandler } = require("../config/helper");
// const { createUserValidation, loginValidator } = require("../validation/userValidator");

router.get("", authMiddleware, tagController.getAll);
router.get("/:id", IdValidation, validationResultHandler(tagController.getById));

router.post("", authMiddleware, tagController.create);

module.exports = router;
