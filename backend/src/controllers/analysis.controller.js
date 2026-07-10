const asyncHandler = require("../middleware/asyncHandler");

const {
  generateAnalysisPDF,
} = require("../services/pdf.service");

const Analysis = require("../models/Analysis");

const { analyzeCompany } = require("../services/ai.service");

exports.createAnalysis = asyncHandler(async (req, res) => {
  const { company, investmentType } = req.body;

  if (!company || !investmentType) {
    return res.status(400).json({
      success: false,
      message: "Company and investment type are required",
    });
  }

  const aiResponse = await analyzeCompany({
    company,
    investmentType,
  });

  const analysis = await Analysis.create({
    user: req.user._id,
    company,
    investmentType,

    recommendation: aiResponse.recommendation,

    confidence: aiResponse.confidence,

    financial: aiResponse.financial,

    news: aiResponse.news,

    risk: aiResponse.risk,

    report: aiResponse.report,
  });

  res.status(201).json({
    success: true,
    analysis,
  });
});

exports.getHistory = asyncHandler(async (req, res) => {

  const analyses = await Analysis.find({
    user: req.user._id
  })
    .sort({ createdAt: -1 });

  res.json({
    success: true,
    analyses
  });

});

//for specific analysis
exports.getAnalysisById = asyncHandler(async (req, res) => {
  const analysis = await Analysis.findOne({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!analysis) {
    return res.status(404).json({
      success: false,
      message: "Analysis not found",
    });
  }

  res.json({
    success: true,
    analysis,
  });
});

//pdf download controller
exports.downloadPDF = asyncHandler(async (req, res) => {

  const analysis = await Analysis.findOne({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!analysis) {
    return res.status(404).json({
      success: false,
      message: "Analysis not found",
    });
  }

  generateAnalysisPDF(analysis, res);

});




