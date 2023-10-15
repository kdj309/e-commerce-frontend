import api from "../../backend/Api";

export async function getAllCategories() {
  const response = await api(`/categories`);
  return response.data;
}

export async function getAllsizeoptions() {
  const response = await api(`/sizes`);
  return response.data;
}
