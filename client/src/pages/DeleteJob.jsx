import { toast } from "react-toastify";
import fetch from "../utils/custom-axios";
import { redirect } from "react-router-dom";

const deletejobAction = async ({ params }) => {
  try {
    await fetch(`/jobs/${params.id}`, "delete");
    toast.success("Job Deleted");
    return redirect("/dashboard/all-jobs");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};


export default deletejobAction;