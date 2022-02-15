const User = require("../model/userModel");
const ErrorHandler = require("../utils/errorhandler");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto"); //built in module
const cloudinary = require("cloudinary");
// -------------------------------A U T H E N T I C A T I O N ---------------------------------------------------------
//------------------register-----------------------
const registerUser = async (req, res, next) => {
  const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: "EcommUsers",
    width: 150,
    crop: "scale",
  });
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });
  const token = user.getJWTToken();

  res
    .status(201)
    .cookie("token", token, {
      httpOnly: true,
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
    })
    .json({ success: true, user, token });
};

//------------------login--------------------------------
const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("Please Provide Email or Password", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid Email or Password", 401));
  }
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Email or Password", 401));
  }

  const token = user.getJWTToken();
  res
    .status(200)
    .cookie("token", token, {
      httpOnly: true,
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
    })
    .json({ success: true, user, token });
};

//----------logout--------------------------------
const logoutUser = async (req, res, next) => {
  res
    .status(200)
    .cookie("token", null, {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({ success: true, message: "Logged Out" });
};

//-----------------forgot password--------------------------
const forgotPassword = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler("User Not Found", 400));
  }
  // get resetPassword Token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/password/reset/${resetToken}`;
  const message = `Your Password reset Token is:- \n\n ${resetPasswordUrl} `;

  try {
    await sendEmail({
      email: user.email,
      subject: `Ecommerse Password Reset`,
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler(error.message, 500));
  }
};

//---------------reset password----------------------------
const resetPassword = async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandler(
        "Reset Password is invalid or has been expired Token",
        400
      )
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password Doesnot match", 400));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();
  const token = user.getJWTToken();
  res
    .status(200)
    .cookie("token", token, {
      httpOnly: true,
      expires: new Date(
        Date.now + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
    })
    .json({ success: true, user, token });
};

// -------------------------------- U S E R  R O U T E S -------------------------------------------------
const getUserDetails = async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    user,
  });
};

const updatePassword = async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");
  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Old-Password Is Incorrect", 400));
  }
  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password Doesnot match", 400));
  }
  user.password = req.body.newPassword;
  await user.save();
  const token = user.getJWTToken();
  res
    .status(200)
    .cookie("token", token, {
      httpOnly: true,
      expires: new Date(
        Date.now + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
    })
    .json({ success: true, user, token });
};

const updateProfile = async (req, res, next) => {
  const newUserDate = {
    name: req.body.name,
    email: req.body.email,
  };
  if (req.body.avatar !== ("" || "undefined")) {
    const user = await User.findById(req.user.id);
    const imageId = user.avatar.public_id;
    await cloudinary.v2.uploader.destroy(imageId);
    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "EcommUsers",
      width: 150,
      crop: "scale",
    });
    newUserDate.avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
  }
  const user = await User.findByIdAndUpdate(req.user.id, newUserDate, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
  });
};

const getAllUsers = async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({ success: true, users });
};

const getSingleUser = async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`User does not exist with Id: ${req.params.id}`)
    );
  }

  res.status(200).json({ success: true, user });
};

const updateUserRole = async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };
  const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({ success: true });
};

const deleteUser = async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(
      new ErrorHandler(`User does not exist with Id: ${req.params.id}`, 400)
    );
  }
  const imageId = user.avatar.public_id;
  await cloudinary.v2.uploader.destroy(imageId);
  await user.remove();
  res.status(200).json({ success: true, message: "User Deleted SuccessFully" });
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updatePassword,
  updateProfile,
  getAllUsers,
  getSingleUser,
  updateUserRole,
  deleteUser,
};
