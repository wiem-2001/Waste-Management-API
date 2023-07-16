/* -------------------------------------------------------------------------- */
/*                                Dependencies                                */
/* -------------------------------------------------------------------------- */

// Packages
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { execSync } = require("child_process");

/* -------------------------------------------------------------------------- */
/*                                Disk Storage                                */
/* -------------------------------------------------------------------------- */

const fileFilter = function (req, file, cb) {
  const ext = path.extname(file.originalname);
     if (
    file.fieldname === "image" &&
    !(ext === ".jpeg" || ext===".jpg" || ext === ".png" || ext===".gif")
  ) {
    return cb(new Error("Only image files are allowed for image"));
  }
  cb(null, true);
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!fs.existsSync(path.join(__dirname, "'../../uploads/"))) {
      execSync(`mkdir "${path.join(__dirname, "'../../uploads/")}"`);
    }
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

const fileUpload = upload.fields([

  { name: "image", maxCount: 1 },
]);

// Multer config
module.exports = { fileUpload };