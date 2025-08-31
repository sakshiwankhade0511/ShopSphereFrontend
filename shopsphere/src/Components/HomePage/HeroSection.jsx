import React from "react";
import "./Herosection.css"
import { NavLink } from "react-router-dom";
import { easeInOut, motion } from "framer-motion";

const HeroSection = ({title, subtitle, link, image}) => {
    return(
        <div className="heroSection">
            <motion.div className="align_center"
             initial={{opacity : 0, x: -100}} 
             whileInView={{ opacity: 1, x: 0}}
             transition={{ duration: 1, ease: easeInOut}}
             viewport={{once: true}}>
                <h2 className="heroTitle">{title}</h2>
                <p className="heroSubtitle">{subtitle}</p>
                <NavLink to={link} className="heroLink">Buy Now</NavLink>
            </motion.div>
            <motion.div className="align_center"
             initial={{opacity : 0, x: 100}} 
             whileInView={{ opacity: 1, x: 0}}
             transition={{ duration: 1, ease: easeInOut}}
             viewport={{once: true}}>
                <img src={image} alt="" className="heroImage"/>
            </motion.div>
        </div>
    );
}

export default HeroSection;