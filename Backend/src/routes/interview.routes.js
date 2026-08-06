import {Router} from 'express';
import {authUser} from '../middlewares/auth.middleware.js';
import {generateInterviewReportController, getAllInterviewReportsController, getInterviewReportController, generateResumePdfController} from '../controllers/interview.controller.js';
import {upload} from '../middlewares/file.middleware.js';
import { aiRateLimiter } from '../middlewares/rateLimit.middleware.js';


const interviewRouter = Router();

//@route POST /api/interview/
//@description generate new interview report on the basis of user self decsroption , resume  , job decsription.
//@access private
interviewRouter.route('/').post(authUser, upload.single("resume"), aiRateLimiter, generateInterviewReportController)

/** @route Get /api/interview/report/:interviewId
 * @description Get interview report by ID
 * @access private
 */
interviewRouter.route('/report/:interviewId').get(authUser, getInterviewReportController);

/**
 * @route GET /api/interview/
 * @description Get all interview reports for the authenticated user
 * @access private
 */
interviewRouter.route('/').get(authUser, getAllInterviewReportsController);


/**
 * @route GET /api/interview/report/:interviewReportId/resume/pdf
 * @description Get the resume PDF for a specific interview report
 */
interviewRouter.route('/report/:interviewReportId/resume/pdf').get(authUser, aiRateLimiter, generateResumePdfController);

export {interviewRouter};