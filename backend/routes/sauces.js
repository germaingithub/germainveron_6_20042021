const express = require('express');
const router = express.Router();

const stuffCtrl = require('../controllers/sauces');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.get('/', auth, stuffCtrl.getOneSauce);
router.get('/:id', auth, stuffCtrl.getAllSauces);
router.post('/',auth, multer, stuffCtrl.createSauce);
router.put('/:id', auth, multer, stuffCtrl.modifyThing);
router.delete('/:id',auth, stuffCtrl.deleteSauce);

module.exports = router;