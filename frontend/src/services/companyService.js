import api from "./api";

export const searchCompanies = async (query) => {
  const response = await api.get(`/company/search?q=${query}`);
  return response.data.companies;
};