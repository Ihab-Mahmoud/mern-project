import Wrapper from "../assets/wrappers/SmallSidebar"
import { FaTimes } from "react-icons/fa";
import {Logo, NavLinks} from "../components/index"
// eslint-disable-next-line react/prop-types
const SmallSidebar = ({ showSidebar, toggleSidebar,user }) => {
  return (
    <Wrapper>
      <div className={showSidebar ? "sidebar-container show-sidebar" : "sidebar-container"}>
        <div className="content">
        <button className="close-btn" onClick={toggleSidebar}>
          <FaTimes />
        </button>
        <header>
          <Logo />
        </header>
        <NavLinks toggleSidebar={toggleSidebar} user={user}/>
        </div>
      </div>
    </Wrapper>
  );
};

export default SmallSidebar