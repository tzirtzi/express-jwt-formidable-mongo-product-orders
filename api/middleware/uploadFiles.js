const multer = require('multer'); 		// body package handler to handle file uploading 

const allowedFileTypes = ['image/jpeg','image/png'];
const allowedFileTypesErrMsg = 'The selected file is not in the allowed file formats!!';
const allowedFileSizeMB = 5;
const storageURI = process.env.FILE_UPLOAD_URI || './public/images/';

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, storageURI );
  },
  filename: function(req, file, cb) {
    cb(null, `${new Date().toISOString()}-${Math.random().toString(36).substring(7)}-${file.originalname}`);
  }
});

const fileFilter = (req, file, cb) => {

  if ( allowedFileTypes.includes(file.mimetype) ) {
    cb( null, true);
  } else {
    cb( Error( allowedFileTypesErrMsg ), false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * allowedFileSizeMB
  },
  fileFilter: fileFilter
});


module.exports = upload;

/**
 * TO USE 
 * 
 * 
 * const upload = require('../uploadFiles');  // handle file uploading 
 * 
 * 
 * router.post("/", upload.single('productImage'), (req, res, next) => {
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
    productImage: req.file.path 
  });
  .....
 * 
 */
