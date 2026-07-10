const PDFDocument = require("pdfkit");

const generateAnalysisPDF = (analysis, res) => {
  const doc = new PDFDocument({
    margin: 50,
    size: "A4",
  });

  res.setHeader("Content-Type", "application/pdf");

  res.setHeader(
    "Content-Disposition",
    `attachment; filename=${analysis.company}-analysis.pdf`
  );

  doc.pipe(res);

  // Title
  doc
    .fontSize(24)
    .font("Helvetica-Bold")
    .text("Investment Analysis Report");

  doc.moveDown();

  doc
    .fontSize(18)
    .text(analysis.financial.companyName);

  doc.moveDown();

  doc
    .fontSize(13)
    .font("Helvetica")
    .text(`Recommendation : ${analysis.recommendation}`);

  doc.text(`Confidence : ${analysis.confidence}%`);

  doc.moveDown();

  doc
    .font("Helvetica-Bold")
    .fontSize(16)
    .text("Financial Overview");

  doc.moveDown(0.5);

  doc
    .font("Helvetica")
    .fontSize(12);

  doc.text(`Current Price : ${analysis.financial.currentPrice}`);

  doc.text(`Market Cap : ${analysis.financial.marketCap}`);

  doc.text(`P/E Ratio : ${analysis.financial.peRatio}`);

  doc.text(`EPS : ${analysis.financial.eps}`);

  doc.text(`ROE : ${analysis.financial.roe}`);

  doc.text(`Revenue Growth : ${analysis.financial.revenueGrowth}`);

  doc.moveDown();

  doc
    .font("Helvetica-Bold")
    .fontSize(16)
    .text("News Analysis");

  doc.moveDown(0.5);

  doc
    .font("Helvetica")
    .fontSize(12)
    .text(analysis.news.summary);

  doc.moveDown();

  doc
    .font("Helvetica-Bold")
    .fontSize(16)
    .text("Risk Assessment");

  doc.moveDown(0.5);

  doc
    .font("Helvetica")
    .fontSize(12);

  doc.text(`Risk Level : ${analysis.risk.level}`);

  doc.text(`Risk Score : ${analysis.risk.score}`);

  doc.text(analysis.risk.summary);

  doc.addPage();

  doc
    .font("Helvetica-Bold")
    .fontSize(20)
    .text("Detailed AI Report");

  doc.moveDown();

  doc
    .font("Helvetica")
    .fontSize(12)
    .text(analysis.report);

  doc.end();
};

module.exports = {
  generateAnalysisPDF,
};