import mongoose from "mongoose";
import {JOB_SORT_BY,JOB_STATUS,JOB_TYPE } from "../utils/constants.js";

const JobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "company name must be provided"],
    },
    position: { type: String, required: [true, "position must be provided"] },
    jobStatus: {
      type: String,
      enum: Object.values(JOB_STATUS),
      default: JOB_STATUS.PENDING,
    },
    jobType: {
      type: String,
      enum: Object.values(JOB_TYPE),
      default: JOB_TYPE.FULL_TIME,
    },
    jobLocation: {
      type: String,
      default: "my city",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "USER",
    },
  },
  { timestamps: true }
);


export default mongoose.model("Job", JobSchema);