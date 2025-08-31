import React from "react";
import "./Quantity.css"

const Quantity = ({quantity, setQuantity, stock, CartPage, productId}) =>{
    return(
        <>
            <button className="quantityInputButton"
             disabled= {quantity <= 1}
             onClick={()=> CartPage ? setQuantity("Decrease", productId) :
              setQuantity(quantity - 1)}>{" "} -{" "} </button>
            <p className="quantityInputCount">{quantity}</p>
            <button className="quantityInputButton"
             disabled= {quantity >= stock}
             onClick={()=> CartPage ? setQuantity("Increase", productId) :
              setQuantity(quantity + 1)}>{" "} + {" "}</button>
        </>
    );
}

export default Quantity;