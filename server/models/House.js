import { Schema } from "mongoose"

export const HouseSchema = new Schema({
  year: { type: Number, required: true, min: 1800, max: 2025 },
  numOfBeds: { type: Number, required: true, min: 1, max: 20 },
  numOfBaths: { type: Number, required: true, min: 0, max: 20 },
  squareFeet: { type: Number, required: true, min: 50, max: 10000 },
  description: { type: String, maxlength: 300 },
  hasGarage: { type: Boolean, default: false },
  price: { type: Number, required: true, max: 10000000 },
  imgUrl: { type: String, maxlength: 200 },
  creatorId: { type: Schema.Types.ObjectId, required: true },
}, { timestamps: true, toJSON: { virtuals: true } });