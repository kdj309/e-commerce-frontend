import api from "../../backend/Api";

export async function getAllCategories() {
  const response = await fetch(`${api}/categories`);
  const data = await response.json();
  return data;
}

export async function getAllsizeoptions() {
  const response = await fetch(`${api}/sizes`);
  const data = await response.json();
  return data;
}
