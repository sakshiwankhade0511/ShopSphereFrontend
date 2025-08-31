import React, {memo, useContext, useMemo } from "react";
import config from "../../config.json"
import "./CartPage.css"
import Table from "../Common/Table";
import Quantity from "../SingleProductPage/Quantity";
import remove from "../../assets/delete.png"
import userContext from "../../Context/userContext";
import cartContext from "../../Context/cartContext";
import { toast } from "react-toastify";
import { CheckoutAPI } from "../../Services/orderServices";

const CartPage = () => {
    const user = useContext(userContext);
    const {cart, removeFromCart, updateCart, setCart} = useContext(cartContext);

    const subTotal = useMemo(() => {
        let total = 0;
        cart.forEach(item => {
            total += item.product.price * item.quantity}
        )

        return total;
    }, [cart])

    const Checkout = () => {
        const oldCart = [...cart]
        setCart([]);
        CheckoutAPI().then(res => {
          toast.success("Order Placed Successfully!");
        }).catch(err => {
            toast.error("Something went Wrong!")
            setCart(oldCart)
        })
      }
    
    return(
        <div className="align_center cartPage">
            <div className="align_center userInfo">
                <img src={`${config.backendURL}/profile/${user?.profilePic}`} alt="user"/>
                <div>
                    <p className="userName">Name : {user?.name}</p>
                    <div className="userEmail">Email : {user?.email}</div>
                </div>
            </div>

            <Table headings={["Name", "price", "Quantity", "Total", "Remove"]}>
                <tbody>
                    {
                        cart.map(({product, quantity}) => <tr key={product._id}>
                        <td>{product.title}</td>
                        <td>${product.price}</td>
                        <td className="align_center quantityTableInput">
                            <Quantity quantity={quantity} 
                            stock={product.stock}
                            setQuantity={updateCart}
                            CartPage={true}
                            productId={product._id}/>
                        </td>
                        <td>${quantity * product.price}</td>
                        <td><img src={remove} alt="delete"
                         className="removeIcon" onClick={() => removeFromCart(product._id)}/></td>
                    </tr>)
                    }
                    
                </tbody>
            </Table>

            <table className="cartBill">
                <tbody>
                    <tr>
                        <td>Subtotal</td>
                        <td>${subTotal}</td>
                    </tr>
                    <tr>
                        <td>Shipping Charges</td>
                        <td>$5</td>
                    </tr>
                    <tr className="cartBillFinal">
                        <td>Total</td>
                        <td>${subTotal + 5}</td>
                    </tr>
                </tbody>
            </table>
            <button className="searchButton checkoutButton" onClick={() => Checkout()}>Checkout</button>
        </div>
    );
}

export default memo(CartPage);