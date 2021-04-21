const express = require('express');
const router = express.Router();

//const sauce = require('../models/sauce');
const sauceCtrl = require('../controllers/sauces');

const auth = require('../middleware/auth');

const multer = require('../middleware/multer-config');

router.get("/", sauceCtrl.getAllSauces);
router.get("/:id", sauceCtrl.getOneSauce);
router.post("/", multer, sauceCtrl.createSauce);
router.put("/:id", multer, sauceCtrl.modifySauce);
router.delete("/:id", sauceCtrl.deleteSauce);
router.post("/:id/like", sauceCtrl.addLike);

module.exports = router;