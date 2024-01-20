const { Router } = require('express');
const router = Router();
const mediaController = require("../controllers/mediaController");
const upload = require("../middleware/multer");

router.post('/upload', upload.single('file'), mediaController.upload);

module.exports = router;