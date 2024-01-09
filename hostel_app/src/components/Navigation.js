import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import appIcon from "../assets/Einstein_Hostels.png";
const Navigation = () => {
    return (
        <>
            <nav className="navigation_light">
                <NavLink to="/" as="a" className="logo-link">
                    <img src={appIcon} alt="The logo for the website" height={50} width={300} />
                </NavLink>
                <NavLink to="/" as="a" className="link" activeclassname="active" exact="true">
                    Home
                </NavLink>
                <NavLink to="/map" as="a" className="link" activeclassname="active">
                    Map
                </NavLink>
                <NavLink to="/itineraries" as="a" className="link" activeclassname="active">
                    itineraries
                </NavLink>
                <NavLink to="/aboutUs" as="a" className="link" activeclassname="active">
                    aboutUs
                </NavLink>
            </nav>
            <Outlet />
        </>
    )
}
export default Navigation;