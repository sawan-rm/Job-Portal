const Company = require("../model/Company.js");

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
    const userId = req.id; //logged in userId
    const companies = await Company.find({ userId });

    if (!companies) {
      return res.status(404).json({
        message: "Company not found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "on-working",
      success: true,
    });
  } catch (error) {
    console.log("Internal server error: ", error);
  }
};

//get Company By Id
const getCompanyById = async (req, res) => {
  try {
    const CompanyId = req.params.id;
    const findCompany = await Company.findById(CompanyId);
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

const updateCompantInfo = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;
    const file = req.file;
    //cloudnary
    const updateData = { name, description, website, location };
    const company = await Company.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });
    if (!company) {
      return res.status(404).json({
        message: "Company not found",
        success: false,
      });
    }
    return res.status(201).json({
      message: "Company Information Updated",
      success: true,
    });
  } catch (error) {
    console.log(`Inernal Server erro: `, error);
  }
};

module.exports = {
  registerCompany,
  getCompany,
  getCompanyById,
  updateCompantInfo,
};
