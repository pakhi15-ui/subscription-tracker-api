import api from "./axios.js";

export const createSubscription = async (data) => {
  const res = await api.post("/subscriptions", data);
  return res.data;
};

export const getUserSubscriptions = async (userId) => {
  const res = await api.get(`/subscriptions/user/${userId}`);
  return res.data;
};

export const getSubscriptionById = async (id) => {
  const res = await api.get(`/subscriptions/${id}`);
  return res.data;
};

export const updateSubscription = async (id, data) => {
  const res = await api.put(`/subscriptions/${id}`, data);
  return res.data;
};

export const deleteSubscription = async (id) => {
  const res = await api.delete(`/subscriptions/${id}`);
  return res.data;
};