const multer = require("multer");

const storage = multer.diskStorage({
  // REVIEW: Remove pic_name, this will cause issues. Dont touch the multer file
  destination: "./media/pic_name",
  filename: (req, file, cb) => {
    cb(null, `${+new Date()}${file.originalname}`);
  },
});

const upload = multer({
  storage,
});

module.exports = upload;
