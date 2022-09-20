const express = require("express");
const router = express.Router();
const saucesCtrl = require("../controllers/sauces");

const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: path.join(__dirname, "public/uploads"),
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

//const upload = multer({ dest: "/images" });

const upload = multer({
  storage,
  dest: path.join(__dirname, "'public/uploads'"),
  limits: { fileSize: 1000000 },
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname));
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb("error: File could be a valid image");
  },
});

router.get("/", saucesCtrl.getAllSauces);
//router.post("/", upload.single("image"), saucesCtrl.createSauce);
router.post("/", upload.single("image"), saucesCtrl.createSauce);
router.get("/:id", saucesCtrl.getOneSauce);
router.put("/:id", saucesCtrl.ModifySauce);
router.delete("/:id", saucesCtrl.DeleteSauce);

module.exports = router;
