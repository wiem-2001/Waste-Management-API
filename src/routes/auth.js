// **************************************Dependencies*************************************************

// Packages
const router = require("express").Router();

// Controllers
const authController = require('../controllers/auth');

// Middlewares
const { fileUpload } = require("../middelwares/multer");

// POST request - create new user
router.post("/auth/signUp", fileUpload, authController.signUp);

module.exports = router;
