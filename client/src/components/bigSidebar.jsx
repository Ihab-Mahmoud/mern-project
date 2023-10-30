import Wrapper from "../assets/wrappers/BigSidebar.js";
import { Logo, NavLinks } from "../components/index.js";

// eslint-disable-next-line react/prop-types
const BigSidebar = ({ toggleSidebar, showSidebar, user }) => {
  return (
    <Wrapper>
      <div
        className={
          showSidebar ? "sidebar-container" : "sidebar-container show-sidebar"
        }
      >
        <div className="content">
          <header>
            <Logo />
          </header>
          <NavLinks toggleSidebar={toggleSidebar} user={user} />
        </div>
      </div>
    </Wrapper>
  );
};

export default BigSidebar;
