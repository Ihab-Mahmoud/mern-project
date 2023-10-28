import express from 'express';
import {
  validateJobInput,
  validateIdParam,
} from "../middlewares/validation.js";

import { checkForTestUser } from '../middlewares/auth.js';
import upload from "../middlewares/multer.js";


const router = express()

import {getAlljobs,getSinglejob,createjob,EditJob,deletejob,stats} from "../controllers/Job.js"

router
  .route("/")
  .get(getAlljobs)
  .post(checkForTestUser,validateJobInput, createjob);
router
  .route("/stats")
  .get(stats)
router
  .route("/:id")
  .get(validateIdParam, getSinglejob)
  .patch(checkForTestUser, validateIdParam, validateJobInput, EditJob)
  .delete(checkForTestUser,validateIdParam, deletejob);



export default router; 