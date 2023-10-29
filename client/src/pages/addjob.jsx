import { FormRowSelect, Formraw, SubmitBtn } from '../components/index.js';
import Wrapper from '../assets/wrappers/DashboardFormPage.js';
import {Form, useOutletContext } from "react-router-dom"
import { JOB_STATUS,JOB_TYPE } from '../../../utils/constants.js';


const Addjob = () =>
{
  const { user } = useOutletContext();
  return (
    <Wrapper>
      <h4 className="form-title">ADD JOB</h4>
      <Form method="post" className="form">
        <div className="form-center">
          <Formraw type="text" name="position" />
          <Formraw type="text" name="company" />
          <Formraw
            type="text"
            name="jobLocation"
            labelValue="Job Location"
            defaultValue={user.location}
          />
          <FormRowSelect
            name="jobStatus"
            labelValue="Job Status"
            list={Object.values(JOB_STATUS)}
            defaultValue={JOB_STATUS.PENDING}
          />
          <FormRowSelect
            name="jobType"
            labelValue="Job Type"
            list={Object.values(JOB_TYPE)}
            defaultValue={JOB_TYPE.FULL_TIME}
          />
          <SubmitBtn formBtn={true} />
        </div>
      </Form>
    </Wrapper>
  );
}

export default Addjob;