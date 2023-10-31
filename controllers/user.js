import { StatusCodes } from "http-status-codes";
import USER from "../models/User.js";
import Job from "../models/Job.js";
import  cloudinary  from "cloudinary";
import { formatImage } from "../middlewares/multer.js";


export const getCurrentUser = async (req, res, next) => {
  const user = await USER.findOne({ _id: req.user.userId });
  res.status(StatusCodes.OK).json({ user: user });
};

export const getAppStats = async (req, res, next) => {
  const users = await USER.countDocuments();
  const jobs = await Job.countDocuments();
  res.status(StatusCodes.OK).json({ users, jobs });
};

export const UpdateUser = async (req, res, next) => {
  const newUser = { ...req.body };
  delete newUser.password;
  if (req.file)
  {
    const file = formatImage(req.file)
    const response = await cloudinary.v2.uploader.upload(file);
    newUser.avatar = response.secure_url;
    newUser.avatarPublicId = response.public_id;
  }

  const updatedUser = await USER.findByIdAndUpdate(req.user.userId, newUser);

  if (req.file && updatedUser.avatarPublicId) {
    await cloudinary.v2.uploader.destroy(updatedUser.avatarPublicId);
  }
  res.status(StatusCodes.OK).json({ msg: "update user" });
};
