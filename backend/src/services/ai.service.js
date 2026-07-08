const axios = require("axios");

const analyzeCompany = async (payload) => {
  const response = await axios.post(
    `${process.env.AI_SERVICE_URL}/analyze`,
    payload
  );

  return response.data;
};

module.exports = {
  analyzeCompany,
};