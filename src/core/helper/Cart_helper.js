export function addItemtoCartandsaveitTolocalStorage(item, next) {
    let cart = []
    let count = 0
    if (localStorage.getItem('cart') != null) {
        cart = JSON.parse(localStorage.getItem('cart'))
    }
    cart.push({
        ...item,
        id: count++
    }
    )
    localStorage.setItem('cart', JSON.stringify(cart))
    next()
}
export function loadproductstocart() {
    if (localStorage.getItem('cart') != null) {
        return JSON.parse(localStorage.getItem('cart'))
    }

}
export function removeItemfromCart(productid) {
    if (localStorage.getItem('cart') != null) {
        let items = JSON.parse(localStorage.getItem('cart'))
        localStorage.setItem('cart', JSON.stringify(items.filter((product) => product._id != productid)))
        return JSON.parse(localStorage.getItem('cart'))
    }
}
export function emptyCart(next) {
    if (localStorage.getItem('cart') !== null) {
        localStorage.removeItem('cart')
        let cart = []
        localStorage.setItem('cart', JSON.stringify(cart))
        if (JSON.parse(localStorage.getItem('cart')).length == 0) {
            return JSON.parse(localStorage.getItem('cart'))
        }
        next()
    }
}