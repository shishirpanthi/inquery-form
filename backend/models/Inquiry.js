import mongoose from "mongoose";

const InquirySchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  mobile: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  studyLevel: { type: String },
  interestedFor: { type: String, required: true },
  otherField: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Inquiry", InquirySchema);
