import React from "react";
import "./FeaturedProduct.css"
import ProductCard from "../Products/Productcard";
import UseData from "../../hooks/UseData";
import ProductPageSkeleton from "../Products/ProductPageSkeleton";
import { easeInOut, motion } from "framer-motion";

const FeaturedProduct = () => {
    const {data, errors, isloading} = UseData("/products/featured", null, ["products", "featured"], 10*60*60*1000)
    const skeletons = [1,2,3]
    
    return(
        <motion.div className="featuredProducts"
             initial={{opacity : 0, y: -100}} 
             whileInView={{ opacity: 1, y: 0}}
             transition={{ duration: 1, ease: easeInOut}}
             viewport={{once: true}}>
            <h2>Featured Products</h2>
            <div className="align_center featuredProductList">
                {errors && <p className="formErrors">{errors}</p>}
                {data && data.map((product) => (<ProductCard key={product._id} product={product}/>))}
                {isloading && skeletons.map(n => <ProductPageSkeleton key={n}/>)} 
            </div>
        </motion.div>
    );
}

export default FeaturedProduct;