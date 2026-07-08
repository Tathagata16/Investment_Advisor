const asyncHandler = require("../middleware/asyncHandler");

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

    financialScore: aiResponse.financialScore,

    newsScore: aiResponse.newsScore,

    riskScore: aiResponse.riskScore,

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



