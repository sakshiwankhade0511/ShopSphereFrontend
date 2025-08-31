import apiClints from "../utils/api-clints";

export function CartAPI(id, quantity) {
    return apiClints.post(`/cart/${id}`, {quantity});
}

export function getCartAPI(){
    return apiClints.get(`/cart`)
}

export function removeCartAPI(id) {
    return apiClints.patch(`/cart/remove/${id}`);
}

export function increaseProductAPI(id) {
    return apiClints.patch(`/cart/increase/${id}`);
}

export function decreaseProductAPI(id) {
    return apiClints.patch(`/cart/decrease/${id}`);
}