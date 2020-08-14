const User = require("../models/User")
const bcrypt = require('bcrypt')

exports.createUser = async (req, res) => {
  const { userEmail, userPassword } = req.body

  let user = await User.findOne({ userEmail })

  if(user) {
    return res.status(400).json({msg: "This user already exists"});
  }

  user = new User(req.body);
  const salt = await bcrypt.genSalt(10);
  user.userPassword = await bcrypt.hash(userPassword, salt);
  
  try {
    await user.save();
    res.json({msg: 'Create user success'});
  } catch (error) {
    console.log(error);
  }
}