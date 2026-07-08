const YahooFinance = require("yahoo-finance2").default;

const yahooFinance = new YahooFinance();

const searchCompanies = async (query) => {
  const result = await yahooFinance.search(query);

  return result.quotes
    .filter(
      (company) =>
        company.symbol &&
        company.shortname
    )
    .map((company) => ({
      symbol: company.symbol,
      name: company.shortname,
      exchange: company.exchange,
    }))
    .slice(0, 8);
};

module.exports = {
  searchCompanies,
};