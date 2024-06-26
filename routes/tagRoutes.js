const { Router } = require("express");
const router = Router();

const authMiddleware = require("../middleware/authMiddleware");
const tagController = require("../controllers/tagContoller");
const { IdValidation } = require("../validation/anyValidator");
const { validationResultHandler } = require("../helper/commonHelper");
// const { createUserValidation, loginValidator } = require("../validation/userValidator");

router.get("", authMiddleware, tagController.getAll);
router.get("/:id", IdValidation, validationResultHandler(tagController.gePostByTagId));

router.post("", authMiddleware, tagController.createTags);

module.exports = router;
