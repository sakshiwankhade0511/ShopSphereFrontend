import { useInfiniteQuery } from "@tanstack/react-query";
import apiClints from "../utils/api-clints";

const useProductList = (query) => {
    const fetchfunction = ({pageParam = 1}) => apiClints.get("/products",{params : {...query, page : pageParam}}).then(res => res.data);

    return useInfiniteQuery({
        queryKey: ["products", query],
        queryFn: fetchfunction,
        getNextPageParam : (lastPage, allPages) => {
            return lastPage.currentPage < lastPage.totalPages ? lastPage.currentPage + 1: null;
        }
    })
}

export default useProductList;