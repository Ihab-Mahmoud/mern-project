import { FormRowSelect, Formraw, SubmitBtn } from "../components/index.js";
import Wrapper from "../assets/wrappers/DashboardFormPage.js";
import { Form, redirect, useLoaderData } from "react-router-dom";
import { JOB_STATUS, JOB_TYPE } from "../../../utils/constants.js";
import fetch from "../utils/custom-axios.jsx";

export const editjobLoader = async ({ params }) => {
  try {
    const { data } = await fetch(`/jobs/${ params.id }`, "get");
    return data;
  } catch (error) {
    console.log(error);
    return redirect("/dashboard/all-jobs");
  }
};

const Editjob = () => {
  const { job } = useLoaderData();
  const user = job[0];
  
  return (
    <Wrapper>
      <h4 className="form-title">Edit Job</h4>
      <Form method="post" className="form">
        <div className="form-center">
          <Formraw type="text" name="position" defaultValue={user.position} />
          <Formraw type="text" name="company" defaultValue={user.company} />
          <Formraw
            type="text"
            name="jobLocation"
            labelValue="Job Location"
            defaultValue={user.jobLocation}
          />
          <FormRowSelect
            name="jobStatus"
            labelValue="Job Status"
            list={Object.values(JOB_STATUS)}
            defaultValue={user.jobStatus}
          />
          <FormRowSelect
            name="jobType"
            labelValue="Job Type"
            list={Object.values(JOB_TYPE)}
            defaultValue={user.jobType}
          />
        <SubmitBtn formBtn={true}/>
        </div>
      </Form>
    </Wrapper>
  );
};

export default Editjob;
