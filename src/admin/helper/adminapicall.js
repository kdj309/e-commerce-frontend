import api from "../../backend/Api";

//!Category calls
//* 1.Creating the Category
export async function Addcategory(userid, token, category) {
    let response = await fetch(`${api}/category/user/createcategory/${userid}`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            'Content-type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(category)
    })
    let data = await response.json()
    return data
}

//* 2.Getting all categories
export async function getCategories() {
    let response = await fetch(`${api}/categories`)
    let data = await response.json()
    return data
}
//* 3. Getting a category
//
export async function getCategory(categoryid) {
    let response = await fetch(`${api}/category/${categoryid}`)
    let data = await response.json()
    return data
}
//* 4. deleting a category
//
export async function DeleteCategory(categoryid, userid, token) {
    let response = await fetch(`${api}/category/${categoryid}/${userid}`, {
        method: "DELETE",
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
    let data = await response.json()
    return data
}
//* 5. updating a category
export async function updatecategory(userid, token, categoryid, newcategory) {
    console.log(newcategory);
    let response = await fetch(`${api}/category/${categoryid}/${userid}`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-type': 'application/json'
        },
        body: JSON.stringify(newcategory)
    })
    let data = await response.json()
    return data
}
//!product calls
//* 1.Creating the product
export const createaProduct = (userId, token, product) => {
    return fetch(`${api}/product/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: product
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
//* 2.Getting all products
export async function getAllproducts() {
    let response = await fetch(`${api}/products/getAllproducts`)
    let data = await response.json()
    return data
}
//* 3.Getting a single product
export async function getproduct(productid) {
    let response = await fetch(`${api}/product/${productid}`)
    let data = await response.json()
    return data
}
//* 4.Updating the product
export async function updateProduct(userid, token, productid, newproduct) {
    let response = await fetch(`${api}/product/updateProduct/${userid}/${productid}`, {
        method: "PUT",
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: newproduct
    })
    let data = await response.json()
    return data
}
//* 5.Deleting the product
export async function deleteProduct(userid, token, productid) {
    let response = await fetch(`${api}/product/deleteProduct/${userid}/${productid}`, {
        method: "DELETE",
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
    let data = await response.json()
    return data
}