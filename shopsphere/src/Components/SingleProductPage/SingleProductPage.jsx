import React, { memo, useContext, useState } from "react";
import "./SingleProductPage.css"
import Quantity from "./Quantity";
import { useParams } from "react-router-dom";
import UseData from "../../hooks/UseData";
import cartContext from "../../Context/cartContext";
import userContext from "../../Context/userContext";


const SingleProductPage = () => {
    const [selectImage, setSelectImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const {addToCart} = useContext(cartContext);
    const user = useContext(userContext);
    const {id} = useParams();

    const {data: product, isloading, errors} = UseData(`/products/${id}`, null, ["products", id])
    return(
        <div className="align_center singleProduct">
            {errors && <p className="formErrors">{errors}</p>}
            {product && <><div className="align_center">
                <div className="productThumbnails">
                    {
                        product.images && product.images.map((image, index) => (
                            <img 
                                key={index}
                                src={`http://localhost:5000/products/${image}`} 
                                alt={product.title} 
                                onClick={() => setSelectImage(index)}
                                className={selectImage === index ? "selectedImage" : ""} 
                            />
                        ))
                    }

                </div>

                {product.images && product.images.length > 0 && (
                    <img 
                        src={`http://localhost:5000/products/${product.images[selectImage]}`} 
                        alt={product.title} 
                        className="singleProductImage"
                    />
                )}

            </div>
            <div className="singleProductDetails">
                <h2 className="singleProductTitle">{product.title}</h2>
                <p className="singleProductDescription">{product.description}</p>
                <p className="singleProductPrice">
                 ${product.price ? product.price.toFixed(2) : "Price not available"}
                </p>
                {user && <><h2 className="quantity">Quantity:</h2>
                    <div className="align_center quantityInput">
                        <Quantity quantity={quantity} setQuantity={setQuantity} stock={product.stock}/>
                    </div>
                <button className="searchButton addCart" onClick={() => addToCart(product, quantity)}>Add to Cart</button></>}
            </div></>}
        </div>
    );
}

export default memo(SingleProductPage);