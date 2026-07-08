import api from "./api";

export const analyzeCompany = async (formData, token) => {
  const response = await api.post("/analysis", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data.analysis;
};