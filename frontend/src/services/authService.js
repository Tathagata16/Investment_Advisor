import api from "./api";

export const signup = async (data) => {
  const response = await api.post("/auth/v1/signup", data);
  return response.data;
};

export const login = async (data) => {
  const response = await api.post("/auth/v1/login", data);
  return response.data;
};

export const getProfile = async () => {
  const token = localStorage.getItem("token");

  const response = await api.get("/user/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};