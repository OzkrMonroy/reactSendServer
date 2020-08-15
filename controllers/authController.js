const User = require("../models/User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator')
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

  if(bcrypt.compare(userPassword, userExist.userPassword)){
    const token = jwt.sign({
      userId: userExist._id,
      userName: userExist.userName
    }, process.env.SECRET_WORD, { expiresIn: '8h'});

    res.json({token});

  }else {
    res.status(401).json({ msg: 'Password is incorrect'});
    return next();
  }
}

exports.getAuthenticatedUser = async (req, res, next) => {
  const authHeader = req.get('Authorization');

  if(authHeader){
    const token = authHeader.split(' ')[1];
    try {
      const user = jwt.verify(token, process.env.SECRET_WORD);
      res.json({user})
    } catch (error) {
      console.log(error);
      res.json({msg: 'Invalid Token'});
    }
  }

  return next();
}