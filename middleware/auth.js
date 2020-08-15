const jwt = require('jsonwebtoken');
require('dotenv').config({ path: 'variables.env' });

module.exports = (req, res, next) => {
  const authHeader = req.get('Authorization');

  if(authHeader){
    const token = authHeader.split(' ')[1];
    try {
      const user = jwt.verify(token, process.env.SECRET_WORD);
      req.user = user
    } catch (error) {
      console.log(error);
      res.json({msg: 'Invalid Token'});
    }
  }

  return next();
}