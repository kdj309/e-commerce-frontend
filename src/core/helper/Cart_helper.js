export function addItemtoCartandsaveitTolocalStorage(item, next) {
    let cart = [];
    let productindex;
    let count = 1;
    if (localStorage.getItem('cart') != null) {
        cart = JSON.parse(localStorage.getItem('cart'))
        productindex = cart.findIndex((productitem) => productitem.name == item.name)
        console.log(productindex)
    }
    if (productindex >= 0) {
        let itempresent = cart[productindex]
        itempresent.count++
        cart[productindex] = itempresent
        console.log(cart);
    } else {
        cart.push({
            ...item,
            count: count++
        }
        )
    }
    console.log(cart);
    localStorage.setItem('cart', JSON.stringify(cart))
    next()
}
export function loadproductstocart() {
    if (localStorage.getItem('cart') != null) {
        return JSON.parse(localStorage.getItem('cart'))
    } else {
        return []
    }

}
export function removeItemfromCart(productid) {
    let productindex;
    let items;
    if (localStorage.getItem('cart') != null) {
        items = JSON.parse(localStorage.getItem('cart'))
        productindex = items.findIndex((productitem) => productitem._id == productid)
        console.log(items[productindex].count)
    }
    if (items[productindex].count == 1) {
        localStorage.setItem('cart', JSON.stringify(items.filter((product) => product._id != productid)))
    } else {
        let itempresent = items[productindex]
        itempresent.count--
        items[productindex] = itempresent
        console.log(items)
        localStorage.setItem('cart', JSON.stringify([...items]))
    }
    return JSON.parse(localStorage.getItem('cart'))
}
export function emptyCart() {

    if (localStorage.getItem('cart') !== null) {
        localStorage.removeItem('cart')
        let cart = []
        localStorage.setItem('cart', JSON.stringify(cart))
        if (JSON.parse(localStorage.getItem('cart')).length == 0) {
            return JSON.parse(localStorage.getItem('cart'))
        }
    }
}