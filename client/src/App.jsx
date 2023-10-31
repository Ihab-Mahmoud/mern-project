import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  Login,
  Register,
  DashboardLayout,
  HomeLayout,
  Error,
  Landing,
  AddJob,
  EditJob,
  Stats,
  Profile,
  AllJobs,
  Admin,
} from "./pages/index.js";
import { CheckTheme, CurrentUserLoader } from "./pages/dashboard.jsx";
// actions and loaders
import { registerSubmit } from "./utils/register-submit.jsx";
import { loginSubmit } from "./utils/login-submit.jsx";
import { addjobSubmit } from "./utils/addjob-submit.jsx";
import { jobsLoader } from "./pages/alljobs.jsx";
import { editjobSubmit } from "./utils/editjob-submit.jsx";
import { EditjobLoader } from "./pages/editjob.jsx";
import deletejobAction from "./pages/DeleteJob.jsx";
import { AdminLoader } from "./pages/admin.jsx";
import { ProfileAction } from "./pages/profile.jsx";
import { StatsLoader } from "./pages/stats.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import ErrorElement from "./components/ErrorElement.jsx";
// check dark mood theme
CheckTheme();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

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
        action: loginSubmit(queryClient),
      },
      {
        path: "/register",
        element: <Register />,
        action: registerSubmit,
      },
      {
        path: "/dashboard",
        element: <DashboardLayout />,
        loader: CurrentUserLoader(queryClient),
        children: [
          {
            index: true,
            element: <AddJob />,
            action: addjobSubmit(queryClient),
            errorElement: <ErrorElement />,
          },
          {
            path: "stats",
            element: <Stats />,
            loader: StatsLoader(queryClient),
            errorElement: <ErrorElement />,
          },
          {
            path: "edit-job/:id",
            element: <EditJob />,
            action: editjobSubmit(queryClient),
            loader: EditjobLoader(queryClient),
            errorElement: <ErrorElement />,
          },
          {
            path: "delete-job/:id",
            action: deletejobAction(queryClient),
          },
          {
            path: "all-jobs",
            element: <AllJobs />,
            loader: jobsLoader(queryClient),
            errorElement: <ErrorElement />,
          },
          {
            path: "profile",
            element: <Profile />,
            action: ProfileAction(queryClient),
            errorElement: <ErrorElement />,
          },
          {
            path: "admin",
            element: <Admin />,
            loader: AdminLoader,
            errorElement: <ErrorElement />,
          },
        ],
      },
    ],
  },
]);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
