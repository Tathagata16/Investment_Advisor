const asyncHandler = require("../middleware/asyncHandler");

const {
  searchCompanies,
} = require("../services/company.service");

exports.search = asyncHandler(async (req, res) => {
  const { q } = req.query;

  if (!q || q.trim().length < 2) {
    return res.json([]);
  }

  const companies = await searchCompanies(q);

  res.json({
    success: true,
    companies,
  });
});