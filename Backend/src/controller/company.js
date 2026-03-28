const Company = require("../model/Company.js");
const getDataUri = require("../utils/dataUri");
const cloudinary = require("../utils/Cloudinary");

const registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body;
    if (!companyName) {
      return res.status(400).json({
        message: "CompanyName is required",
        success: false,
      });
    }

    let company = await Company.findOne({ name: companyName });
    if (company) {
      return res.status(400).json({
        message: "Company already exist",
        success: false,
      });
    }

    company = await Company.create({
      name: companyName,
      user_id: req.id,
    });

    return res.status(201).json({
      message: "Company registered Successfully",
      company,
      success: true,
    });
  } catch (error) {
    console.log("Internal server error: ", error);
  }
};

const getCompany = async (req, res) => {
  try {
    const user_id = req.id; //logged in userId
    const companies = await Company.find({ user_id });

    if (!companies.length) {
      return res.status(404).json({
        message: "Company not found",
        success: false,
      });
    }
    return res.status(200).json({
      companies,
      success: true,
    });
  } catch (error) {
    console.log("Internal server error: ", error);
  }
};

//get Company By Id
const getCompanyById = async (req, res) => {
  try {
    const user_id = req.params.id;
    // console.log("Company Id:", req.params.id);
    const findCompany = await Company.findById(user_id);
    if (!findCompany) {
      return res.status(404).json({
        message: "Company not found",
        success: false,
      });
    }
    return res.status(201).json({
      findCompany,
      success: true,
    });
  } catch (error) {
    console.log(`Inernal Server erro: `, error);
  }
};

const updateCompanyInfo = async (req, res) => {
  try {
    const companyId = req.params.id;

    const { name, description, website, location } = req.body;

    const updateData = {};

    if (name) updateData.name = name;
    if (description) updateData.description = description;
    if (website) updateData.website = website;
    if (location) updateData.location = location;

    if (req.file) {
      const fileUri = getDataUri(req.file);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
      updateData.logo = cloudResponse.secure_url;
    }

    const company = await Company.findByIdAndUpdate(companyId, updateData, {
      new: true, 
      runValidators: true,
    });

    if (!company) {
      return res.status(404).json({
        message: "Company not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Company updated successfully",
      company,
      success: true,
    });
  } catch (error) {
    console.error("Update company error:", error);

    return res.status(500).json({
      message: error.message || "Internal server error", // ✅ better debug
      success: false,
    });
  }
};

module.exports = {
  registerCompany,
  getCompany,
  getCompanyById,
  updateCompanyInfo,
};
