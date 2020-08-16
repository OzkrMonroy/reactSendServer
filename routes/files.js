const express = require('express');
const router = express.Router();
const filesController = require('../controllers/filesController');
const auth = require('../middleware/auth');

router.post('/', auth, filesController.uploadFile);

router.delete('/:id', auth, filesController.deleteFile);

module.exports = router