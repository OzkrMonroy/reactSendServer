const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { check } = require('express-validator');

router.get('/', authController.getAuthenticatedUser);

router.post('/', authController.authenticatedUser);

module.exports = router;