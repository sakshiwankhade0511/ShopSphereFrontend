import React, { memo, useContext } from "react";
import { NavLink } from 'react-router-dom'
import "./ProductCard.css"
import iphone from "../../assets/Apple.jpg"
import cart from "../../assets/cart.png"
import star from "../../assets/star1.png"
import cartContext from "../../Context/cartContext";
import userContext from "../../Context/userContext";

const ProductCard = ({product}) => {
    const { addToCart } = useContext(cartContext);
    const user = useContext(userContext);
    return(
        <div className="productCard">
            <div className="productImage">
                <NavLink to={`/product/${product?._id}`}>
                <img src={`http://localhost:5000/products/${product?.images[0]}`} alt="#" /></NavLink>
            </div>

            <div className="productsDetails">
                <h3 className="productPrice">${product?.price}</h3>
                <p className="productTitle">{product?.title}</p>

                <footer className="align_center productInfo">
                    <div className="align_center">
                        <p className="align_center productRating">
                            <img src={star} alt="#"/> {product?.reviews.rate}
                        </p>
                        <p className="productReview">{product?.reviews.counts}</p>
                    </div>

                    {product?.stock > 0 && user && <button className="addToCart" onClick={() => addToCart(product, 1)}>
                        <img src={cart} alt="" />
                    </button>}
                </footer>
            </div>
        </div>
    );
}

export default memo(ProductCard);