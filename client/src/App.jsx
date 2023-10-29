import { createBrowserRouter ,RouterProvider } from "react-router-dom";
import { Login, Register, DashboardLayout, HomeLayout, Error, Landing, AddJob, EditJob, Stats, Profile, AllJobs, Admin } from "./pages/index"
import { checkTheme, currentUserLoader } from "./pages/dashboard";


// actions and loaders
import { registerSubmit } from "./utils/register-submit";
import { loginSubmit } from "./utils/login-submit";
import { addjobSubmit } from "./utils/addjob-submit";
import { jobsLoader } from "./pages/alljobs";
import { editjobSubmit } from "./utils/editjob-submit";
import { editjobLoader } from "./pages/editjob";
import deletejobAction from "./pages/DeleteJob";
import { adminLoader } from "./pages/admin"
import { profileAction } from "./pages/profile";
import { StatsLoader } from "./pages/stats";
// check dark mood theme
checkTheme()


const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "/login",
        element: <Login />,
        action: loginSubmit,
      },
      {
        path: "/register",
        element: <Register />,
        action: registerSubmit,
      },
      {
        path: "/dashboard",
        element: <DashboardLayout />,
        loader: currentUserLoader,
        children: [
          {
            index: true,
            element: <AddJob />,
            action: addjobSubmit,
          },
          {
            path: "stats",
            element: <Stats />,
            loader:StatsLoader
          },
          {
            path: "edit-job/:id",
            element: <EditJob />,
            action: editjobSubmit,
            loader: editjobLoader,
          },
          {
            path: "delete-job/:id",
            action: deletejobAction,
          },
          {
            path: "all-jobs",
            element: <AllJobs />,
            loader: jobsLoader,
          },
          {
            path: "profile",
            element: <Profile />,
            action:profileAction,
          },
          {
            path: "admin",
            element: <Admin />,
            loader: adminLoader,
          },
        ],
      },
    ],
  },
]);
const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
