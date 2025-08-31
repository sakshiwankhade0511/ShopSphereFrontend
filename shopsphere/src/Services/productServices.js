import apiClints from "../utils/api-clints";

export function getSuggestionsAPI(search) {
    return apiClints.get(`/products/suggestions?search=${search}`)
}