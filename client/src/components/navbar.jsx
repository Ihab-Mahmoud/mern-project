/* eslint-disable react/prop-types */
import { FaAlignLeft } from "react-icons/fa";
// import { FaUserCircle, FaCaretDown } from "react-icons/fa";

import Wrapper from "../assets/wrappers/Navbar.js";
import {Logo,LogoutContainer,Themetoggle} from "../components/index.js";
// eslint-disable-next-line react/prop-types
const Navbar = ({
  toggleSidebar,
  user,
  logoutUser,
  toggleDarkTheme,
  isDarkTheme,
}) =>

{
  
  return (
    <Wrapper>
      <div className="nav-center">
        <button className="toggle-btn" type="button" onClick={toggleSidebar}>
          <FaAlignLeft />
        </button>
        <div>
          <Logo className="logo" />
          <h4 className="logo-text">Dashboard</h4>
        </div>
        <div className="btn-container">
          <Themetoggle
            toggleDarkTheme={toggleDarkTheme}
            isDarkTheme={isDarkTheme}
          />
          <LogoutContainer logoutUser={logoutUser} user={user} />
        </div>
      </div>
    </Wrapper>
  );
};

export default Navbar;
