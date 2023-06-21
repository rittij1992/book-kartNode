const multer = require('multer');

const bookImageStorage =  multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'Public/BookCovers/')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + '.' + file.originalname.split('.').pop())
    }
  })

  exports.bookCoverUpload = multer({ storage: bookImageStorage });
