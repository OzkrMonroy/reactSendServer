const express = require('express');
const router = express.Router();
const userController = require('../controllers/usersController');
const { check } = require('express-validator');

router.post('/',
  [
    check('userName', 'El nombre no debe estar vacío').not().isEmpty(),
    check('userEmail', 'Ingresa un email válido').isEmail(),
    check('userPassword', 'La constraseña debe tener almenos seis caracteres').isLength({min: 6})
  ],
  userController.createUser
);

module.exports = router;