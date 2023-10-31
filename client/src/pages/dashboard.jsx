import { useCallback, useEffect, useState } from "react";
import {
  Outlet,
  redirect,
  useLoaderData,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import Wrapper from "../assets/wrappers/Dashboard.js";
import {
  Navbar,
  SmallSidebar,
  BigSidebar,
  Loading,
} from "../components/index.js";
import fetch, { customFetch } from "../utils/custom-axios.jsx";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";

const currentUserQuery = {
  queryKey: ["currentUser"],
  queryFn: async () => {
    const { data } = await fetch("/user/current-user", "get");
    return data;
  },
};

export const CurrentUserLoader = (queryClient) => async () => {
  try {
    await queryClient.ensureQueryData(currentUserQuery);
    return queryClient;
  } catch (error) {
    console.log(error);
    return redirect("/");
  }
};

export const CheckTheme = () => {
  const check = localStorage.getItem("dark-theme") === "true";
  if (check) {
    document.body.classList.add("dark-theme");
  }
  return check;
};

const Dashboard = () => {
  const { data } = useQuery(currentUserQuery);
  const queryClient = useLoaderData();
  const user = data?.user;
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(CheckTheme);
  const [isAuthError, setIsAuthError] = useState(false);
  const toggleDarkTheme = async () => {
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);
    document.body.classList.toggle("dark-theme", newDarkTheme);
    localStorage.setItem("dark-theme", newDarkTheme);
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  // const logoutUser = async () => {
  //   navigate("/");
  //   await fetch("/logout", "get");
  //   queryClient.invalidateQueries(["currentUser"]);
  //   toast.success("Logging out...");
  // };
  const logoutUser = useCallback(async () => {
    navigate("/");
    await fetch("/logout", "get");
    queryClient.invalidateQueries(["currentUser"]);
    toast.success("Logging out...");
  }, [queryClient,navigate]);
  customFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error?.response?.status === 401) {
        setIsAuthError(true);
      }
      return Promise.reject(error);
    }
  );
  useEffect(() => {
    if (!isAuthError) return;
    logoutUser();
  }, [isAuthError, logoutUser]);
  return (
    <Wrapper>
      <main className="dashboard">
        <BigSidebar
          toggleSidebar={toggleSidebar}
          showSidebar={showSidebar}
          user={user}
        />
        <SmallSidebar
          toggleSidebar={toggleSidebar}
          showSidebar={showSidebar}
          user={user}
        />
        <div>
          <Navbar
            toggleSidebar={toggleSidebar}
            logoutUser={logoutUser}
            user={user}
            toggleDarkTheme={toggleDarkTheme}
            isDarkTheme={isDarkTheme}
          />
          <div className="dashboard-page">
            {isLoading ? <Loading /> : <Outlet context={{ user }} />}
          </div>
        </div>
      </main>
    </Wrapper>
  );
};

export default Dashboard;
  