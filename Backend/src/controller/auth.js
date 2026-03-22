const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const getDataUri = require("../utils/dataUri");
const cloudinary = require("../utils/Cloudinary");

const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;
    // console.log(fullname, email, phoneNumber, password, role);

    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }
    //cloudinary here....
    const file = req.file;
    let cloudResponse;
    if (file) {
      const fileUri = getDataUri(file);
      cloudResponse = await cloudinary.uploader.upload(fileUri.content);
    }

    const user = await User.findOne({ email });
    if (user)
      return res.status(400).json({
        message: "User already exist with this email.",
        success: false,
      });
    const hashedPassword = await bcrypt.hash(password, 10);
    const userData = {
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
      profile: {},
    };

    if(cloudResponse) {
      userData.profile.profilePhoto = cloudResponse.secure_url;
    }
    await User.create(userData);
    
    return res.status(200).json({
      message: "Account created Successfully",
      success: true,
    });
  } catch (error) {
    console.log("Internal server error", error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    // console.log(email, password, role);

    if (!email || !role || !password) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user)
      return res.status(400).json({
        message: "User not exist with this email.",
        success: false,
      });
    // console.log(password, user.password);

    const ispasswordMatch = await bcrypt.compare(password, user.password);
    if (!ispasswordMatch) {
      return res.status(401).json({
        message: "Wrong password",
        success: false,
      });
    }
    //check role is correct or not
    if (role != user.role) {
      return res.status(400).json({
        message: "Account does  not exist with current role.",
        success: false,
      });
    }

    //generating token
    const tokenData = {
      userId: user._id,
    };
    const token = await jwt.sign(tokenData, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: false,
    });
    return res.status(200).json({
      message: `Welcome back ${user.fullname}`,
      user: {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        role: user.role,
        profile: user.profile,
      },
      token,
      success: true,
    });
  } catch (error) {
    console.log("Internal server error", error);
  }
};

const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "").json({
      message: "Logged Out Successfully",
      success: true,
    });
  } catch (error) {
    console.log("Internal server error", error);
  }
};

const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body;
    const file = req.file;

    const userId = req.id;
    let user = await User.findById(userId);

    if (!user) {
      return res.status(401).json({
        message: "User not found",
        success: false,
      });
    }

    // Ensure profile exists
    if (!user.profile) {
      user.profile = {};
    }

    // Skills handling
    let skillsArray;
    if (skills) {
      skillsArray = Array.isArray(skills)
        ? skills
        : skills.split(",").map((s) => s.trim());
    }

    // Upload only if file exists
    if (file) {
      const fileUri = getDataUri(file);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
        resource_type: "raw",
        access_mode: "public",
      });

      user.profile.resume = cloudResponse.secure_url;
      user.profile.resumeOriginalName = file.originalname;
    }

    // Update fields
    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (skillsArray) user.profile.skills = skillsArray;

    await user.save();

    return res.status(200).json({
      message: "Profile Updated Successfully",
      user,
      success: true,
    });
  } catch (error) {
    console.log("Internal server error", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
module.exports = {
  register,
  login,
  logout,
  updateProfile,
};
