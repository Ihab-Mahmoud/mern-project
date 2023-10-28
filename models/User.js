import mongoose from "mongoose";
import { JOB_SORT_BY, JOB_STATUS, JOB_TYPE } from "../utils/constants.js";
import { hashPassword, comparePassword } from "../utils/password.js";
import { createJWT } from "../utils/jwt-token.js";

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  lastName: {
    type: String,
    default: "lastName",
  },
  location: {
    type: String,
    default: "my city",
  },
  role: {
    type: String,
    enum: ["user", "admin","demo"],
    default: "user",
  },
  avatar: String,
  avatarPublicId: String,
});

UserSchema.pre("save", async function () {
  const hashedPassword = await hashPassword(this.password);
  this.password = hashedPassword;
});

UserSchema.methods.Compare = async function (candidatePassword)
{
  const passwordValidation = await comparePassword(candidatePassword, this.password);
  return passwordValidation;
};

UserSchema.methods.CreateToken =  function ()
{
  return createJWT({userId:this._id,role:this.role})
}
UserSchema.methods.toJSON = function ()
{
  var obj = this.toObject();
  delete obj.password;
  return obj;
};
export default mongoose.model("User", UserSchema);
