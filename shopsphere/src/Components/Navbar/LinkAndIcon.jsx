import React from "react";
import "./LinkAndIcon.css"
import { NavLink } from 'react-router-dom'

const LinkAndIcon = ({title, emoji, path, sidebar, id}) => {
    return(
        <NavLink to={path} id={id} className={sidebar ? "align_center sidebarLink" : "align_center"} >
            {title} <img src={emoji} alt="Icon" className="align_center navIcon"/>
        </NavLink>
    );
}

export default LinkAndIcon;