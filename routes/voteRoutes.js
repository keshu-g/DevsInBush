const { Router } = require("express");
const router = Router();

const voteController = require("../controllers/voteController");
const authMiddleware = require("../middleware/authMiddleware");
const { validationResultHandler } = require("../helper/commonHelper");
const { voteValidator } = require("../validation/voteValidator");
const { IdValidation } = require("../validation/anyValidator");

router.get("/:id", IdValidation, validationResultHandler(voteController.getVoteCount));

router.post("", authMiddleware, voteValidator, validationResultHandler(voteController.voteManager));

module.exports = router;
