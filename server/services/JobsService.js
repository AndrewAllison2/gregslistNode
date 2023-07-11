import { dbContext } from "../db/DbContext.js"
import { BadRequest } from "../utils/Errors.js"

export class JobsService {
  async getJobs() {
    const jobs = await dbContext.Jobs.find()
    return jobs
  }

  async getJobsById(jobId) {
    const job = await dbContext.Jobs.findById(jobId)
    if (!job) {
      throw new BadRequest('Aint no house with that id bud')
    }
    return job
  }

  async createJob(jobData) {
    const job = await dbContext.Jobs.create(jobData)
    return job
  }
}

export const jobsService = new JobsService()