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


export const getHistory = async (token) => {

    const response = await api.get(
        "/analysis/history",
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data.analyses;

};


export const getAnalysisById = async (id, token) => {
  const response = await api.get(`/analysis/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.analysis;
};