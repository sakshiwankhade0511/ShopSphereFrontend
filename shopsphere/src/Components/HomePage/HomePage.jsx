import React from "react";
import HeroSection from "./HeroSection";
import iphone from "../../assets/Apple.jpg"
import mac from "../../assets/mac1.webp"
import FeaturedProduct from "./FeaturedProduct";

const HomePage = () => {
    return(
        <div>
            <HeroSection title="Buy iphone 14 Pro" subtitle="Step into the future of mobile technology with unmatched performance and elegance."
            link="/product/689c6c5bf87c871605eaa6ff" image={iphone}/>
            
            <FeaturedProduct/>
            
            <HeroSection title="Build the Ultimate setup" subtitle="Experience the ultimate blend of performance, aesthetics, and innovation."
            link="/product/689c6c5bf87c871605eaa707" image={mac}/>
        </div>
    );
}

export default HomePage;