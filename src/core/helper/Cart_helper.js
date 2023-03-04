export function addItemtoCartandsaveitTolocalStorage(item, next) {
  let cart = [];
  let productindex;
  let count = 1;
  if (localStorage.getItem("cart") !== null) {
    cart = JSON.parse(localStorage.getItem("cart"));
    productindex = cart.findIndex(
      (productitem) => productitem.name === item.name
    );
  }
  if (productindex >= 0) {
    let itempresent = cart[productindex];
    itempresent.count++;
    cart[productindex] = itempresent;
  } else {
    cart.push({
      ...item,
      count: count++,
    });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  next();
}
export function loadproductstocart() {
  if (localStorage.getItem("cart") !== null) {
    return JSON.parse(localStorage.getItem("cart"));
  } else {
    return [];
  }
}
export function removeItemfromCart(productid) {
  let productindex;
  let items;
  if (localStorage.getItem("cart") !== null) {
    items = JSON.parse(localStorage.getItem("cart"));
    productindex = items.findIndex(
      (productitem) => productitem._id === productid
    );
  }
  if (items[productindex].count === 1) {
    localStorage.setItem(
      "cart",
      JSON.stringify(items.filter((product) => product._id !== productid))
    );
  } else {
    let itempresent = items[productindex];
    itempresent.count--;
    items[productindex] = itempresent;
    localStorage.setItem("cart", JSON.stringify([...items]));
  }
  return JSON.parse(localStorage.getItem("cart"));
}
export function incrementQuantity(productid) {
  let productindex;
  let items;
  if (localStorage.getItem("cart") !== null) {
    items = JSON.parse(localStorage.getItem("cart"));
    productindex = items.findIndex(
      (productitem) => productitem._id === productid
    );
  }
  if (items[productindex].count === items[productindex].Availabelstock) {
    window.alert("Sorry We Reached Maximum Stock");
    localStorage.setItem("cart", JSON.stringify(items));
  } else {
    let itempresent = items[productindex];
    itempresent.count++;
    items[productindex] = itempresent;
    localStorage.setItem("cart", JSON.stringify([...items]));
  }
  return JSON.parse(localStorage.getItem("cart"));
}
export function emptyCart() {
  if (localStorage.getItem("cart") !== null) {
    localStorage.removeItem("cart");
    let cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
    if (JSON.parse(localStorage.getItem("cart")).length === 0) {
      return JSON.parse(localStorage.getItem("cart"));
    }
  }
}
export function totalAmount(products) {
  return products.reduce((total, product) => {
    return total + Math.floor(product.price * product.count);
  }, 0);
}
