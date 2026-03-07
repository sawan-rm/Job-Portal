const express = require("express");
const {
  registerCompany,
  getCompany,
  getCompanyById,
  updateCompantInfo,
} = require("../controller/company");
const isAuthenticate = require("../middleware/isAuthenticated");

const router = express.Router();

router.post("/register", isAuthenticate, registerCompany);
router.post("/get", isAuthenticate, getCompany);
router.get("/get/:id", isAuthenticate, getCompanyById);
router.post("/update/:id", isAuthenticate, updateCompantInfo);

module.exports = router;
