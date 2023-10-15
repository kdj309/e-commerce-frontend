import api from "../../backend/Api";

//!Category calls
//* 1.Creating the Category
export async function Addcategory(userid, token, category) {
  let response = await api(`/category/user/createcategory/${userid}`, {
    method: "POST",
    data: category,
  });
  return response.data;
}

//* 2.Getting all categories
export async function getCategories() {
  let response = await api(`/categories`);
  return response.data;
}
//* 3. Getting a category
//
export async function getCategory(categoryid) {
  let response = await api(`/category/${categoryid}`);
  return response.data;
}
//* 4. deleting a category
//
export async function DeleteCategory(categoryid, userid, token) {
  let response = await api(`/category/${categoryid}/${userid}`, {
    method: "DELETE",
  });
  return response.data;
}
//* 5. updating a category
export async function updatecategory(userid, token, categoryid, newcategory) {
  let response = await api(`/category/${categoryid}/${userid}`, {
    method: "PUT",
    data: newcategory,
  });
  return response.data;
}
//!product calls
//* 1.Creating the product
export const createaProduct = async (userId, token, product) => {
  try {
    const response = await api(`/product/create/${userId}`, {
      method: "POST",
      data: product,
    });
    return response;
  } catch (err) {
    console.log(err)
    return err;
  }
};
//* 2.Getting all products
export async function getAllproducts() {
  let response = await api(`/products/getAllproducts`);
  return response.data;
}
//* 3.Getting a single product
export async function getproduct(productid) {
  let response = await api(`/product/${productid}`);
  
  if (response.status!==200) {
    throw new Error("Something went wrong");
  }
  return response.data;
}
//* 4.Updating the product
export async function updateProduct(userid, token, productid, newproduct) {
  let response = await api(
    `/product/updateProduct/${userid}/${productid}`,
    {
      method: "PUT",
      data: newproduct,
    }
  );
  return response.data;
}
//* 5.Deleting the product
export async function deleteProduct(userid, token, productid) {
  let response = await api(
    `/product/deleteProduct/${userid}/${productid}`,
    {
      method: "DELETE",
    }
  );
  return response.data;
}
export async function getOrders(id, token) {
  let response = await api(`/Orders/${id}`, {
    method: "GET",
  });
  return response.data;
}

export async function getOrderedCategories(id, token) {
  let response = await api(`/categories/${id}`, {
    method: "GET",
  });
  return response.data;
}
export async function deleteOrder(userid, orderid, token) {
  let response = await api(`/Orders/${userid}/${orderid}`, {
    method: "DELETE",
  });
  return response.data;
}
export async function getAllusers(userid, authtoken) {
  let response = await api(`/allusers/${userid}`, {
    method: "GET",
  });
  return response.data;
}
export async function deleteUser(userid, authtoken, useridtodelete) {
  let response = await api(`/user/${userid}/delete/${useridtodelete}`, {
    method: "DELETE",
  });
  return response.data;
}
export async function getAllSizeOptions() {
  let response = await api(`/sizes`);
  return response.data;
}
export function getDayname(day) {
  switch (day) {
    case 0:
      return "Sun";
    case 1:
      return "Mon";
    case 2:
      return "Tue";
    case 3:
      return "Wed";
    case 4:
      return "Tur";
    case 5:
      return "Fri";
    case 6:
      return "Sat";
    default:
      break;
  }
}
const initialMonthlyproducts = [
  { name: "Jan", y: 22 },
  { name: "Feb", y: 18 },
  { name: "Mar", y: 32 },
  { name: "Apr", y: 16 },
  { name: "May", y: 16 },
  { name: "Jun", y: 16 },
  { name: "Jul", y: 16 },
  { name: "Aug", y: 16 },
  { name: "Sep", y: 16 },
  { name: "Oct", y: 16 },
  { name: "Nov", y: 16 },
  { name: "Dec", y: 16 },
];
const weeklyusersdata = [
  {
    name: "Mon",
    y: 10,
  },
  {
    name: "Tue",
    y: 12,
  },
  {
    name: "Wed",
    y: 14,
  },
  {
    name: "Tur",
    y: 18,
  },
  {
    name: "Fri",
    y: 22,
  },
  {
    name: "Sat",
    y: 21,
  },
  {
    name: "Sun",
    y: 6,
  },
];

const piechartsampledata = [
  {
    name: "Chrome",
    y: 70.67,
    sliced: true,
    selected: true,
  },
  {
    name: "Edge",
    y: 14.77,
  },
  {
    name: "Firefox",
    y: 4.86,
  },
  {
    name: "Safari",
    y: 2.63,
  },
  {
    name: "Internet Explorer",
    y: 1.53,
  },
  {
    name: "Opera",
    y: 1.4,
  },
  {
    name: "Sogou Explorer",
    y: 0.84,
  },
  {
    name: "QQ",
    y: 0.51,
  },
  {
    name: "Other",
    y: 2.6,
  },
];
export { initialMonthlyproducts, weeklyusersdata, piechartsampledata };
