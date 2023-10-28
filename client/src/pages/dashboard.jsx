import { useState } from "react";
import { Outlet, redirect, useLoaderData, useNavigate } from "react-router-dom";
import Wrapper from "../assets/wrappers/Dashboard";
import { Navbar, SmallSidebar, BigSidebar } from "../components/index";
import fetch from "../utils/custom-axios";
import { toast } from "react-toastify";

export const currentUserLoader = async () => {
  try {
    const { data } = await fetch("/user/current-user", "get");
    return data;
  } catch (error) {
    return redirect("/");
  }
};

export const checkTheme = () => {
  const check = localStorage.getItem("dark-theme") === "true";
  if (check) {
    document.body.classList.add("dark-theme");
  }
  return check;
};
// checkTheme()

const Dashboard = () => {
  const data = useLoaderData();
  const user = data.user;

  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(checkTheme);

  const toggleDarkTheme = async () => {
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);
    document.body.classList.toggle("dark-theme", newDarkTheme);
    localStorage.setItem("dark-theme", newDarkTheme);
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const logoutUser = async () => {
    navigate("/");
    await fetch("/logout", "get");
    toast.success("Logging out...");
  };
  return (
    <Wrapper>
      <main className="dashboard">
        <BigSidebar toggleSidebar={toggleSidebar} showSidebar={showSidebar} user={user} />
        <SmallSidebar toggleSidebar={toggleSidebar} showSidebar={showSidebar} user={user} />
        <div>
          <Navbar
            toggleSidebar={toggleSidebar}
            logoutUser={logoutUser}
            user={user}
            toggleDarkTheme={toggleDarkTheme}
            isDarkTheme={isDarkTheme}
          />
          <div className="dashboard-page">
            <Outlet context={{user}} />
          </div>
        </div>
      </main>
    </Wrapper>
  );
};

export default Dashboard;
