import React, { useEffect, useState} from "react";
import "./ProductList.css";
import ProductCard from "./Productcard";
import ProductPageSkeleton from "./ProductPageSkeleton";
import { useSearchParams } from "react-router-dom";
import useProductList from "../../hooks/useProductList";

const ProductsList =() =>{
    const [search, setSearch ] = useSearchParams();
    const [sortBy, setSortBy] = useState("");
    const [sortedProducts, setSortedProducts] = useState([]);
    const category = search.get("category");
    const searchQuery = search.get("search")

    const {data, errors, isFetching, hasNextPage, fetchNextPage} = useProductList({
        search: searchQuery,
        category,
    })
    
    const skeletons = [1,2,3,4,5,6,7,8];

    //pagination logic if needed
    const handleclick = page => {
        const currentParams = Object.fromEntries([...search])
        setSearch({...currentParams, page : parseInt(currentParams.page) + 1});
    }

    useEffect(() => {
        if(data && data.pages){
            const products = data.pages.flatMap((page) => page.products);

            if(sortBy === "price desc"){
                setSortedProducts(products.sort((a , b) => b.price - a.price));
            } else if (sortBy === "price asc") {
                setSortedProducts(products.sort((a , b) => a.price - b.price));
            } else if(sortBy === "rate desc"){
                setSortedProducts(products.sort((a , b) => b.reviews.rate - a.reviews.rate));
            } else if (sortBy === "rate asc") {
                setSortedProducts(products.sort((a , b) => a.reviews.rate - b.reviews.rate));
            } else {
                setSortedProducts(products)
            }
        } else {
            setSortedProducts([])
        }
    }, [sortBy, data])

    useEffect(() => {
        const handleScroll = () => {
            const {scrollTop, clientHeight, scrollHeight} =
            document.documentElement;
            if(scrollTop + clientHeight >= scrollHeight -1 && !isFetching && hasNextPage){
                fetchNextPage();
            }
        };
        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, [data, isFetching])

    return(
        <div className="productListSection">
            <div className="align_center productListHeader">
                <h2>Products</h2>
                <select name="sort" id="" className="productsSorting"
                onChange={e => setSortBy(e.target.value)}>
                    <option value="">Relevance</option>
                    <option value="price desc">Price HIGH to LOW</option>
                    <option value="price asc">Price LOW to HIGH</option>
                    <option value="rate desc">Rate HIGH to LOW</option>
                    <option value="rate asc">Rate LOW to HIGH</option>
                </select>
            </div>
            <div className="productsList">
                {errors && <p className="formErrors">{errors}</p>}
                {
                    sortedProducts.map((product) => (<ProductCard key={product._id} product={product}/>)
                )
                }
                {isFetching && skeletons.map(n => <ProductPageSkeleton key={n}/>)} 
            </div>
        
        </div>
        
    );
}

export default ProductsList;