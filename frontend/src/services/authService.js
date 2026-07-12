import api from "./api";

export const signup = async (data) => {
  const response = await api.post("/auth/signup", data);
  return response.data;
};

export const login = async (data) => {
  const response = await api.post("/auth/login", data);
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