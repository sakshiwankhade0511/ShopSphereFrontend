import React from "react";
import "./productsPage.css"
import ProductSidebar from "./ProductSidebar";
import ProductsList from "./ProductList";

const ProductPage =() =>{
    return(
        <div className="productsPage">
            <ProductSidebar/>
            <ProductsList/>
        </div>
    );
}

export default ProductPage;