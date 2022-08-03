const multer = require('multer');
const { v4: uuid } = require('uuid');
const path = require('path');
const { BadRequestErrorResponse } = require('../responses');

const storage = (relativePath = '') =>
  multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, `uploads/${relativePath}`);
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      cb(null, `${uuid()}${ext}`);
    },
  });

const fileFilter =
  (allowedMimes = []) =>
  (req, file, cb) => {
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(BadRequestErrorResponse('Invalid file type.'));
    }
  };

const uploads = (relativePath = '', allowedMimes = []) =>
  multer({
    storage: storage(relativePath),
    fileFilter: fileFilter(allowedMimes),
  });

module.exports = uploads;
