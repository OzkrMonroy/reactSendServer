const Link = require("../models/Link");
const shortid = require("shortid");
const bcrypt = require('bcrypt');
const { validationResult } = require("express-validator");

exports.createFileLink = async (req, res, next) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()});
  }

  const { fileOriginalName } = req.body;
  
  const newLink = new Link();

  newLink.fileUrl = shortid.generate();
  newLink.fileName = shortid.generate();
  newLink.fileOriginalName = fileOriginalName;

  if(req.user){
    const { filePassword, fileDownloadsCount } = req.body
    if(fileDownloadsCount){
      newLink.fileDownloadsCount = fileDownloadsCount
    }
    if(filePassword){
      const salt = await bcrypt.genSalt(10);
      newLink.filePassword = await bcrypt.hash(filePassword, salt);
    }
    newLink.fileCreatedBy = req.user.userId
  }

  try {
    await newLink.save();
    return res.json({msg: `${newLink}`});
    next();
  } catch (error) {
    console.log(error);
  }
}