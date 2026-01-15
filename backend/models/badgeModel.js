import mongoose from "mongoose";

const badgeSchema = new mongoose.Schema({
  badgeName: { 
    type: String, 
    required: true 
  },
  iconURL: { 
    type: String, 
    required: true 
  },
  criteriaType: { 
    type: String, 
    enum: ['streak'], //for now, limited sa streaks ang badges 
    required: true 
  },
  criteriaValue: {
    type: Number,
    required: true
  }
});

const Badge = mongoose.model("Badge", badgeSchema);

export default Badge;
