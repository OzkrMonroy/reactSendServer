const multer = require('multer');
const shortid = require('shortid');
const fs = require('fs');
const Link = require('../models/Link');

exports.uploadFile = async (req, res, next) => {
  const multerConfiguration = {
    limits: { fileSize: req.user ? 1024*1024*10 : 1000000},
    storage: fileStorage = multer.diskStorage({
      destination: (req, file, callback) => {
        callback(null, __dirname+'/../uploads')
      },
      filename: (req, file, callback) => {
        const extension = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
        callback(null, `${shortid.generate()}${extension}`);
      }
    })
  }
  
  const upload = multer(multerConfiguration).single('file');
  
  upload(req, res, async (error) => {
    console.log(req.file);
    
    if(!error){
      res.json({file: req.file.filename});
    }else {
      console.log(error);
      return next()
    }
  })
}

exports.downloadFile = async (req, res, next) => {
  const { file } = req.params;
  const verifiedLink = await Link.findOne({fileName: file});

  console.log(verifiedLink);

  const fileToDownload = __dirname+'/../uploads/'+file
  res.download(fileToDownload);

  const { fileDownloadsCount, fileName } = verifiedLink;
  
  if(fileDownloadsCount === 1){
    req.file = fileName
    await Link.findOneAndRemove(verifiedLink.id);
    next()
  }else{
    verifiedLink.fileDownloadsCount--;
    verifiedLink.save();
  }
}

exports.deleteFile = async (req, res) => {
  try {
    fs.unlinkSync(__dirname + `/../uploads/${req.file}`);
    console.log('File has been deleted');
  } catch (error) {
    console.log(error);
  }
}