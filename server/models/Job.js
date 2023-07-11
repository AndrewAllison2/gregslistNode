import { Schema } from "mongoose";

export const JobSchema = new Schema({
  title: { type: String, required: true, minlength: 5, maxlength: 20 },
  salary: { type: Number, required: true, min: 25000 },
  fullTime: { type: Boolean, required: true, default: true },
  description: { type: String, maxlength: 500 },
  requiresDegree: { type: Boolean, default: false },
  creatorId: { type: Schema.Types.ObjectId, required: true }
}, {
  timestamps: true, toJSON: { virtuals: true }
})