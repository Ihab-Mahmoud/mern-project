import Job from "../models/Job.js";
import { StatusCodes } from "http-status-codes";
import mongoose, { Mongoose } from "mongoose";
import day from "dayjs";

export const getAlljobs = async (req, res, next) => {
  // filter jobs by position,company,jobStatus and jobType

  const { search, jobStatus, jobType, sort } = req.query;

  const queryObject = {
    createdBy: req.user.userId,
  };

  if (search) {
    queryObject.$or = [
      { position: { $regex: search, $options: `i` } },
      { company: { $regex: search, $options: `i` } },
    ];
  }

  if (jobStatus && jobStatus !== "all" ) {
    queryObject.jobStatus = jobStatus;
  }

  if (jobType && jobType !== "all") {
    queryObject.jobType = jobType;
  }

  const sortValues = {
    newest: "-createdAt",
    oldest: "createdAt",
    "a-z": "position",
    "z-a": "-position",
  };

  const sortKey = sortValues[sort] || sortValues.newest;

  // setup pagination

  const page = req.query.page || 1;
  const limit = req.query.limit || 10;
  const skip = (page - 1) * limit;

  const jobs = await Job.find(queryObject).sort(sortKey).skip(skip).limit(limit)

  const totalJobs = await Job.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalJobs / limit);

  res.status(StatusCodes.OK).json({
    message: "data fetched successfully",
    jobs,
    numOfPages: numOfPages,
    currentPage: page,
    totalJobs: totalJobs,
  });
};

export const getSinglejob = async (req, res, next) => {
  const job = await Job.find({
    _id: req.params.id,
    createdBy: req.user.userId,
  });
  res
    .status(StatusCodes.OK)
    .json({ message: "data fetched successfully", job });
};

export const createjob = async (req, res, next) => {
  req.body.createdBy = req.user.userId;
  const job = await Job.create({ ...req.body });
  res
    .status(StatusCodes.CREATED)
    .json({ message: "job created successfully", job });
};

export const EditJob = async (req, res, next) => {
  const job = await Job.findOneAndUpdate(
    { _id: req.params.id },
    { ...req.body },
    { new: true, runValidators: true }
  );
  res
    .status(StatusCodes.OK)
    .json({ message: "data updated successfully", job });
};

export const deletejob = async (req, res, next) => {
  const job = await Job.deleteOne({ _id: req.params.id });
  res.status(StatusCodes.OK).json({ message: "job deleted successfully", job });
};

export const stats = async (req, res, next) => {
  let appStats = await Job.aggregate([
    {
      $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) },
    },
    {
      $group: {
        _id: "$jobStatus",
        count: { $sum: 1 },
      },
    },
  ]);

  appStats = appStats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});

  let appGroupStats = await Job.aggregate([
    {
      $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) },
    },
    {
      $group: {
        _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
        count: { $sum: 1 },
      },
    },
    {
      $sort: {
        "_id.year": -1,
        "_id.month": -1,
      },
    },
    {
      $limit: 6,
    },
  ]);

  appGroupStats = appGroupStats
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;

      const date = day()
        .month(month - 1)
        .year(year)
        .format("MMM YY");
      return { date, count };
    })
    .reverse();

  const defaultStats = {
    pending: appStats.pending || 0,
    interview: appStats.interview || 0,
    declined: appStats.declined || 0,
  };

  res.status(StatusCodes.OK).json({ defaultStats, appGroupStats });
};
