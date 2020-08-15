const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { check } = require('express-validator');

router.get('/', authController.getAuthenticatedUser);

router.post('/', [
  check('userEmail', 'Ingresa un email válido').isEmail(),
  check('userPassword', 'La contraseña no debe estar vacía').not().isEmpty()
] ,authController.authenticatedUser);

module.exports = router;