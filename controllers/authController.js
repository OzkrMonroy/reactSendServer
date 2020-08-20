const User = require("../models/User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
require('dotenv').config({ path: 'variables.env' });

exports.authenticatedUser = async (req, res, next) => {

  const errors = validationResult(req);

  if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()});
  }

  const { userEmail, userPassword } = req.body

  let userExist = await User.findOne({ userEmail });

  if(!userExist){
    res.status(401).json({ msg: 'User doesn\'t exist'});
    return next()
  }

  if(bcrypt.compareSync(userPassword, userExist.userPassword)){
    const token = jwt.sign({
      userId: userExist._id,
      userName: userExist.userName,
      userEmail: userExist.userEmail
    }, process.env.SECRET_WORD, { expiresIn: '8h'});

    res.json({token});

  }else {
    res.status(401).json({ msg: 'Password is incorrect'});
    return next();
  }
}

exports.getAuthenticatedUser = (req, res, next) => {
  res.json({user: req.user})
}