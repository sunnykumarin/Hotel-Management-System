import User from "../models/User.js";

export const protect = async (req, res, next) => {
  try {
    const auth = await req.auth();

    if (!auth.userId) {
      return res.status(401).json({
        success: false,
        message: "Not authenticated",
      });
    }

    const user = await User.findById(auth.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found in database",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};