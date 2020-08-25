const express = require("express");
const router = express.Router();
const linksCreatorController = require("../controllers/linksCreatorController");
const filesController = require("../controllers/filesController");
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

router.get('/', linksCreatorController.fetchAllLinks)

router.get('/:url', linksCreatorController.verifyLinkHasPassword, linksCreatorController.getFileLink);
router.post('/:url', linksCreatorController.verifyLinkPasswordIsCorrectly, linksCreatorController.getFileLink);

module.exports = router;
