const User = require("../models/User")
const bcrypt = require('bcrypt');

exports.authenticatedUser = async (req, res, next) => {
  const { userEmail, userPassword } = req.body

  let userExist = await User.findOne({ userEmail });

  if(!userExist){
    res.status(401).json({ msg: 'User doesn\'t exist'});
    return next()
  }

  if(bcrypt.compare(userPassword, userExist.userPassword)){
    return res.status(200).json({ msg: 'Password is correct'});
  }else {
    res.status(401).json({ msg: 'Password is incorrect'});
    return next();
  }
}

exports.getAuthenticatedUser = async (req, res) => {}