import { redirect } from "react-router-dom";
import fetch from "../utils/custom-axios.jsx";
import { toast } from "react-toastify";

export const addjobSubmit = async ({ request }) => {
  try {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    await fetch("/jobs", "post", data);
    toast.success("Job Created");
    return redirect("/dashboard/all-jobs");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};
