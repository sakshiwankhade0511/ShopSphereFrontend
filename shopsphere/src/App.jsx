import React, { useCallback, useEffect, useReducer, useState } from "react";
import {ToastContainer, toast} from 'react-toastify'
import userContext from "./Context/userContext";
import cartContext from "./Context/cartContext";
import "./App.css"
import Navbar from "./Components/Navbar/Navbar";
import Routing from "./Components/Routing/Routing";
import { getjwt, getUser } from "./Services/userServices";
import Quantity from "./Components/SingleProductPage/Quantity";
import setAuthToken from "./utils/setAuthTokens";
import { CartAPI, getCartAPI, increaseProductAPI, removeCartAPI } from "./Services/cartServices";
import 'react-toastify/dist/ReactToastify.css'
import { CheckoutAPI } from "./Services/orderServices";
import UseData from "./hooks/UseData";

setAuthToken(getjwt());

const App = () => {
  const [user, setUser] = useState(null)
  const [cart, setCart] = useState([])

  useEffect(() => {
    try {
      const jwtUser = getUser()
      if(Date.now() >= jwtUser.exp * 1000) {
        localStorage.removeItem("token")
        location.reload()
      } else {
        setUser(jwtUser);
      }
    } catch (error) {}
    
  }, [])

  const addToCart = useCallback((product, quantity) => {
    const updatedCart = [...cart]
    const productIndex = updatedCart.findIndex(item => item.product._id === product._id);

    if(productIndex === -1){
      updatedCart.push({product: product, quantity: quantity})
    } else {
      updatedCart[productIndex].quantity += quantity
    }

    setCart(updatedCart);

    CartAPI(product._id, quantity).then(res => {
      toast.success("Product Added Successfully!");
    }).catch(err => {
      toast.error("Failed to add Product")
    })
  }, [cart])

  const getCart = useCallback(() => {
    getCartAPI().then(res => {
      setCart(res. data)
    }).catch(err => {
      toast.error("Something went wrong!")
    })
  }, [user])

  const removeFromCart = useCallback(id => {
    const oldCart = [...cart];
    const newCart = oldCart.filter(item => item.product._id !== id)
    setCart(newCart);

    removeCartAPI(id).catch(err => {
      toast.error("Something went wrong!");
      setCart(oldCart)
    })
  }, [cart])

  const updateCart = useCallback((type,id) => {
    const oldCart = [...cart]
    const updatedCart = [...cart];
    const productIndex = updatedCart.findIndex(item => 
      item.product._id === id
    )

    if(type === "Increase"){
      updatedCart[productIndex].quantity += 1
      setCart(updatedCart);

      increaseProductAPI(id).catch(err => {
        toast.error("Something went wrong!")
        setCart(oldCart)
      })
    }
    if(type === "Decrease"){
      updatedCart[productIndex].quantity -= 1
      setCart(updatedCart);

      decreaseProductAPI(id).catch(err => {
        toast.error("Something went wrong!")
        setCart(oldCart)
      })
    }
  }, [cart])

  useEffect(() => {
     if(user){
      getCart()
    }
  }, [user])
  

  return(
    <userContext.Provider value={user}>
      <cartContext.Provider value={{cart, addToCart, removeFromCart, updateCart, setCart}}>
        <div className="app">
          <Navbar/>
          <div className="main">
            <ToastContainer position="bottom-right"/>
            <Routing />
          </div>
        </div>
      </cartContext.Provider>
    </userContext.Provider>
  );
}

export default App;