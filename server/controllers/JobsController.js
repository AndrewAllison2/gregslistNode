import { jobsService } from "../services/JobsService.js";
import BaseController from "../utils/BaseController.js";

export class JobsController extends BaseController {
  constructor() {
    super('api/jobs')
    this.router

      .get('', this.getJobs)
      .get('/id', this.getJobsById)


      .post('', this.createJob)
  }

  async getJobs(req, res, next) {
    try {
      const jobs = await jobsService.getJobs()
      res.send(jobs)
    } catch (error) {
      next(error)
    }
  }

  async getJobsById(req, res, next) {
    try {
      const jobId = req.params.id

      const job = await jobsService.getJobsById(jobId)
      res.send(job)
    } catch (error) {
      next(error)
    }
  }

  async createJob(req, res, next) {
    try {
      const jobData = req.body
      jobData.creatorId = req.userInfo.id
      const newJob = await jobsService.createJob(jobData)
      res.send(newJob)
    } catch (error) {
      next(error)
    }
  }
}