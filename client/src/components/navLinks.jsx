/* eslint-disable react/prop-types */
import links from "../utils/links";
import { NavLink } from "react-router-dom";

const NavLinks = ({ toggleSidebar,user }) => {
  return (
    <div className="nav-links">
      {links.map((link) => {
        const { text, path, icon } = link;
        // admin user
        if (text === "admin" && user.role !== "admin") {
          return null;
        } 
        return (
          <NavLink
            to={path}
            key={text}
            onClick={toggleSidebar}
            className="nav-link"
            end
          >
            <span className="icon">{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
};

export default NavLinks;
