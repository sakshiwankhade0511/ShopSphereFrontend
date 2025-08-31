import apiClints from "../utils/api-clints";

export async function CheckoutAPI() {
    return await apiClints.post("/order/checkout");
}
