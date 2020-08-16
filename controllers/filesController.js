const multer = require('multer');
const shortid = require('shortid');

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

exports.deleteFile = async (req, res) => {}