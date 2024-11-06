// multer.js
const multer = require('multer');
const path = require('path');


// Define storage options
const storage = multer.diskStorage({
  destination: (req: any, file: any, cb: (arg0: null, arg1: string) => void) => {
    cb(null, 'uploads/'); // Define the folder where files will be saved
  },
  filename: (req: any, file: { originalname: any; }, cb: (arg0: null, arg1: any) => void) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to filename
  }
});

const upload = multer({ storage: storage });

module.exports = upload;
