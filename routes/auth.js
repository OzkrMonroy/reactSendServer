const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { check } = require('express-validator');
const auth = require('../middleware/auth');

router.get('/', auth, authController.getAuthenticatedUser);

router.post('/', [
  check('userEmail', 'Ingresa un email válido').isEmail(),
  check('userPassword', 'La contraseña no debe estar vacía').not().isEmpty()
] ,authController.authenticatedUser);

module.exports = router;