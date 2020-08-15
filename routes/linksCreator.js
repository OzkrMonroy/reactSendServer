const express = require("express");
const router = express.Router();
const linksCreatorController = require("../controllers/linksCreatorController");
const { check } = require("express-validator");
const auth = require("../middleware/auth");

router.post(
  "/",
  [
    check("fileOriginalName", "Selecciona un archivo").not().isEmpty(),
    check("fileName", "Selecciona un archivo").not().isEmpty(),
  ],
  auth,
  linksCreatorController.createFileLink
);

module.exports = router;
