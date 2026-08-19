import api from "./axios.js";

export const signUp = async ({ name, email, password }) => {
  const res = await api.post("/auth/sign-up", { name, email, password });
  return res.data;
};

export const signIn = async ({ email, password }) => {
  const res = await api.post("/auth/sign-in", { email, password });
  return res.data;
};