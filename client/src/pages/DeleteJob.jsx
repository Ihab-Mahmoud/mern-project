import { toast } from "react-toastify";
import fetch from "../utils/custom-axios.jsx";
import { redirect } from "react-router-dom";

const deletejobAction =
  (queryClient) =>
  async ({ params }) => {
    try {
      await fetch(`/jobs/${params.id}`, "delete");
      queryClient.invalidateQueries(["stats"]);
      queryClient.invalidateQueries(["jobs"]);
      toast.success("Job Deleted");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
    }
    return redirect("/dashboard/all-jobs");
  };

export default deletejobAction;
