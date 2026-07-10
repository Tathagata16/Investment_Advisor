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
    report: {
      type: String,
      default: "",
    },
    financial: {
      type: Object,
      default: {},
    },

    news: {
      type: Object,
      default: {},
    },

    risk: {
      type: Object,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Analysis", analysisSchema);