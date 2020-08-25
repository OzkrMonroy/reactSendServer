const Link = require("../models/Link");
const shortid = require("shortid");
const bcrypt = require('bcrypt');
const { validationResult } = require("express-validator");

exports.createFileLink = async (req, res, next) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()});
  }

  const { fileOriginalName, fileName } = req.body;
  
  const newLink = new Link();

  newLink.fileUrl = shortid.generate();
  newLink.fileName = fileName;
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
    res.json({msg: `${newLink.fileUrl}`});
    next();
  } catch (error) {
    console.log(error);
  }
}

exports.verifyLinkHasPassword = async (req, res, next) => {
  const { url } = req.params;
  const verifiedLink = await Link.findOne({fileUrl: url});

  if(!verifiedLink){
    res.status(404).json({msg: 'Link doesn\'t exists'});
    return next();
  }
  if(verifiedLink.filePassword){
    return res.json({password: true, link: verifiedLink.fileUrl});
  }
  next();
}

exports.verifyLinkPasswordIsCorrectly = async (req, res, next) => {
  const { url } = req.params;
  const { password } = req.body;

  const link = await Link.findOne({fileUrl: url});
  
  if(bcrypt.compareSync(password, link.filePassword)){
    next();
  }else{
    return res.status(401).json({msg: 'La contraseña es incorrecta'});
  }
}

exports.getFileLink = async (req, res, next) => {
  const { url } = req.params;
  const verifiedLink = await Link.findOne({fileUrl: url});

  if(!verifiedLink){
    return res.status(404).json({msg: 'Link doesn\'t exists'});
  }
  
  res.json({file: verifiedLink.fileName, password: false});

  next();
}

exports.fetchAllLinks = async (req, res) => {
  try {
    const linksList = await Link.find({}).select('fileUrl -_id');
    res.json({linksList})
  } catch (error) {
    console.log(error);
  }
}