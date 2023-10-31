import { toast } from "react-toastify";
import fetch from "../utils/custom-axios.jsx";
import { redirect, useLoaderData } from "react-router-dom";
import { StatItem } from "../components/index.js";
import Wrapper from "../assets/wrappers/StatsContainer.js";
import { FaCalendarCheck, FaSuitcaseRolling } from "react-icons/fa";
export const AdminLoader = async () => {
  try {
    const { data } = await fetch("/user/admin/app-stats", "get");
    return data;
  } catch (error)
  {
    toast.error("you are not allowed to access this page");
    redirect("/dashboard")
  }
};

const Admin = () =>
{
  const {users,jobs} = useLoaderData()

  return (
    <Wrapper>
      <StatItem
        title="Current Users"
        count={users}
        color="#e9b949"
        bcg="#fcefc7"
        icon={<FaSuitcaseRolling />}
      />
      <StatItem
        title="Total Jobs"
        count={jobs}
        color="#647acb"
        bcg="#e0e8f9"
        icon={<FaCalendarCheck />}
      />
    </Wrapper>
  );
};

export default Admin;
