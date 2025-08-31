import React from "react";
import config from "../../config.json"
import "./ProductSidebar.css";
import LinkAndIcon from "../Navbar/LinkAndIcon";
import UseData from "../../hooks/UseData";

const ProductSidebar = ({title, path, emoji}) => {
    const {data: categories, errors } = UseData("/category", null, ["categories"], 24*60*60*1000)

    return(
        <div className="productsSidebar">
            <h2>Category</h2>
            <div className="categoryLink">
                {errors && <p className="formErrors">{errors}</p>}
                {categories && categories.map((category) => (<LinkAndIcon key={category._id} id={category._id}  title={category.name} 
                path={`/products?category=${category.name}`}
                emoji={`${config.backendURL}/category/${category.image}`} 
                sidebar={true}/>))}
            </div>
        </div>
    );
} 

export default ProductSidebar;