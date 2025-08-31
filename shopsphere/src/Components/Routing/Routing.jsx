import React, { useContext } from 'react'
import {Routes, Route} from 'react-router-dom'

import HomePage from "../HomePage/HomePage";
import ProductPage from "../Products/ProductsPage";
import SingleProductPage from "../SingleProductPage/SingleProductPage";
import CartPage from "../Cart/CartPage";
import MyOrderPage from "../MyOrder/MyOrderPage";
import LoginForm from "../AllForms/LoginForm";
import SignupPage from "../AllForms/SignupPage";
import Logout from '../Common/Logout';
import cartContext from '../../Context/cartContext';
import ProtectedRoute from './ProtectedRoute';

const Routing = () => {
  const {cart, addToCart} = useContext(cartContext);
  return (
    <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/products' element={<ProductPage/>}/>
        <Route path='/product/:id' element={<SingleProductPage/>}/>
        <Route path='/login' element={<LoginForm/>}/>
        <Route path='/signup' element={<SignupPage/>}/>
        <Route element={<ProtectedRoute/>}>
        <Route path='/cart' element={<CartPage/>}/>
        <Route path='/orders' element={<MyOrderPage/>}/>
        <Route path='/logout' element={<Logout/>}/>
        </Route>
    </Routes>
  )
}

export default Routing