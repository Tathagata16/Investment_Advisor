const mongoose = require("mongoose");

const analysisSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    company: {
      type: String,
      required: true,
    },

    investmentType: {
      type: String,
      enum: ["long", "short"],
      required: true,
    },

    recommendation: {
      type: String,
      default: "",
    },

    confidence: {
      type: Number,
      default: 0,
    },

    financialScore: {
      type: Number,
      default: 0,
    },

    newsScore: {
      type: Number,
      default: 0,
    },

    riskScore: {
      type: Number,
      default: 0,
    },

    report: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Analysis", analysisSchema);