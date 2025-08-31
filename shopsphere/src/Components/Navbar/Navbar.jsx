import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from 'react-router-dom'
import "./Navbar.css"
import Home from "../../assets/home.jpg"
import Product from "../../assets/product.png"
import Login from "../../assets/login.png"
import Signup from "../../assets/signup.png"
import Orders from "../../assets/order.jpg"
import Logout from "../../assets/logout.jpg"
import LinkAndIcon from "./LinkAndIcon";
import userContext from "../../Context/userContext";
import cartContext from "../../Context/cartContext";
import { getSuggestionsAPI } from "../../Services/productServices";
import { easeInOut, motion } from "framer-motion";


const Navbar = () => {
    const [search, setSearch] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [selectedItem, setSelectedItem] = useState(-1);
    const user = useContext(userContext);
    const navigate = useNavigate();
    const {cart} = useContext(cartContext);

    const handlesubmit = (e) => {
        e.preventDefault();
        if(search.trim() !== "") {
            navigate(`/products?search=${search.trim()}`);
        }
        setSuggestions([])
    }

    const handleKeyDown = (e) => {
        if(selectedItem < suggestions.length){
            if(e.key === "ArrowDown"){
            setSelectedItem(current => current === suggestions.length - 1 ? 0 : 
                current + 1)
            }
            else if(e.key === "ArrowUp") {
                setSelectedItem(current => current === 0 ? suggestions.length - 1 : 
                    current - 1)
            }
            else if (e.key === "Enter" && selectedItem > -1){
                const suggestion = suggestions[selectedItem]
                navigate(`/products?search=${suggestion.title}`)
                setSearch("")
                setSuggestions([])
            }
        } 
        else {
            setSelectedItem(-1)
        }
    }
    
    useEffect(() => {
        const delaySuggestions = setTimeout(() => {
            if(search.trim() !== "") {
            getSuggestionsAPI(search)
            .then(res => setSuggestions(res.data))
            .catch(err => console.log(err));
            }else {
                setSuggestions([]);
            }
        }, 600);
        
        return () => clearTimeout(delaySuggestions)
    }, [search]);
    return(
        <nav className="align_center navbar">
            <motion.div className="align_center"
             initial={{opacity : 0, y: -30}} 
             whileInView={{ opacity: 1, y: 0}}
             transition={{ duration: 1, ease: easeInOut}}
             viewport={{once: true}}>
                <h1 className="navbarHeading">ShopSphere</h1>
                <form className="align_center navbarForm" onSubmit={handlesubmit}>
                    <input className="navbarSearch" 
                    placeholder="SearchProduct" 
                    type="text" 
                    name="search"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    onKeyDown={handleKeyDown}/>
                    <button className="searchButton" type="submit">Search</button>

                    {suggestions.length > 0 && <ul className="searchResult">
                        {
                            suggestions.map((suggestion, index) => (<li className={selectedItem === index ?
                                "searchResultLink active" : "searchResultLink"
                            }
                            key={suggestion._id}>
                            <Link to={`/products?search=${suggestion.title}`}
                            onClick={() => {setSearch("")
                                            setSuggestions([])
                            }}>{suggestion.title}</Link>
                            </li>))
                        }
                        
                    </ul>}
                </form>
            </motion.div>
            <motion.div className="align_center navbarLinks"
             initial={{opacity : 0, y: -30}} 
             whileInView={{ opacity: 1, y: 0}}
             transition={{ duration: 1, ease: easeInOut}}
             viewport={{once: true}}>
                <LinkAndIcon title="Home" path="/" emoji={Home}/>
                <LinkAndIcon title="Products" path="/products" emoji={Product}/>
                {!user && <><LinkAndIcon title="Login" path="/login" emoji={Login}/>
                <LinkAndIcon title="Signup" path="/signup" emoji={Signup}/></>}
                {user && <><LinkAndIcon title="My Orders" path="/orders" emoji={Orders}/>
                <LinkAndIcon title="Logout" path="/logout" emoji={Logout} />
                <NavLink to="/cart" className="align_center">
                    Cart <p className="align_center cartCounts">{cart.length}</p>
                </NavLink></>}
                
            </motion.div>
        </nav>
    );
}

export default Navbar;