import React from "react";
import { NavLink , Outlet} from "react-router-dom";
const Navigation = () => {
    return (
        <>
            <nav className="navigation_light">
                <NavLink to="/" as="a" className="link" activeClassName="active">
                    Home
                </NavLink>
                <NavLink to="/map" as="a" className="link" activeClassName="active">
                    Map
                </NavLink>
                <NavLink to="/search" as="a" className="link" activeClassName="active">
                    Search
                </NavLink>
                <NavLink to="/filter" as="a" className="link" activeClassName="active">
                    Filter
                </NavLink>
            </nav>
            <Outlet/>
        </>
    )
}
export default Navigation;