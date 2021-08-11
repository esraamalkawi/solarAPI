const multer = require("multer");

const storage = multer.diskStorage({
  destination: "./media",
  filename: (req, file, cd) => {
    cd(null, `${+new Date()}${file.originalname}`);
  },
});

const upload = multer({
  storage: storage,
});

module.exports = upload;
