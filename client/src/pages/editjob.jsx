import { FormRowSelect, Formraw, SubmitBtn } from "../components/index.js";
import Wrapper from "../assets/wrappers/DashboardFormPage.js";
import { Form, redirect, useLoaderData } from "react-router-dom";
import { JOB_STATUS, JOB_TYPE } from "../../../utils/constants.js";
import fetch from "../utils/custom-axios.jsx";
import { useQuery } from "@tanstack/react-query";

const singleJobQuery = (params) => {
  const { id } = params;
  return {
    queryKey: [
      "single",
      id
    ],
    queryFn: async () => {
       const { data } = await fetch(`/jobs/${id}`, "get");
       return data;
    },
  };
};

export const EditjobLoader =
  (queryClient) =>
  async ({ params }) => {
    try {
      await queryClient.ensureQueryData(singleJobQuery(params));
      return params;
    } catch (error) {
      console.log(error);
      return redirect("/dashboard/all-jobs");
    }
  };

const Editjob = () =>
{
  const params = useLoaderData()
  const {data} = useQuery(singleJobQuery(params));
  const user = data?.job[0];
  
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
