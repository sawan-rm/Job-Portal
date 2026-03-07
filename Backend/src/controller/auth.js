const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;
    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }
    const user = await User.findOne({ email });
    if (user)
      return res.status(400).json({
        message: "User already exist with this email.",
        success: false,
      });
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
    });

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
        name: user.name,
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

    // console.log(fullname, email, phoneNumber, bio, skills);

    //cloudaniry here.............
    let skillsArray;
    if (skills) {
      skillsArray = Array.isArray(skills)
        ? skills
        : skills.split(",").map((s) => s.trim());
    }

    const UserId = req.id; //middleware authentication
    let user = await User.findById(UserId);
    if (!user) {
      return res.status(401).json({
        message: "User not found.",
        success: false,
      });
    }
    //Updation
    if (fullname) user.fullname = fullname;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (email) user.email = email;
    if (bio) user.profile.bio = bio;
    if (skillsArray) user.profile.skills = skillsArray;

    //resum remaining................

    await user.save();

    return res.status(200).json({
      message: `Profile Updated Successfully`,
      user: {
        _id: user._id,
        name: user.fullname,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
        profile: user.profile,
      },
      success: true,
    });
  } catch (error) {
    console.log("Internal server error", error);
  }
};

module.exports = {
  register,
  login,
  logout,
  updateProfile,
};
