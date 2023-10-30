/* eslint-disable react/prop-types */
import { Link, useSubmit } from "react-router-dom";
import { JOB_STATUS, JOB_SORT_BY, JOB_TYPE } from "../../../utils/constants.js";
import Wrapper from "../assets/wrappers/DashboardFormPage.js";
import { Formraw, FormRowSelect } from "./index.js";

const SearchContainer = ({ params }) => {
  const debounce = (onChange) => {
    let timeout;
    return (e) => {
      const form = e.currentTarget.form;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        onChange(form);
      }, 2000);
    };
  };
  const submit = useSubmit();
  return (
    <Wrapper>
      <form className="from">
        <h5 className="form-title">Search Form</h5>
        <div className="form-center">
          <Formraw
            type="text"
            name="search"
            onChangeSubmit={debounce((form) => {
              submit(form);
            })}
          />
          <FormRowSelect
            list={["all", ...Object.values(JOB_STATUS)]}
            name="jobStatus"
            labelValue="Job Status"
            defaultValue={params?.jobStatus}
            onChangeSubmit={(e) => {
              submit(e.currentTarget.form);
            }}
          />
          <FormRowSelect
            list={["all", ...Object.values(JOB_TYPE)]}
            name="jobType"
            labelValue="Job Type"
            defaultValue={params?.jobType}
            onChangeSubmit={(e) => {
              submit(e.currentTarget.form);
            }}
          />
          <FormRowSelect
            list={Object.values(JOB_SORT_BY)}
            name="sort"
            defaultValue={params?.sort}
            onChangeSubmit={(e) => {
              submit(e.currentTarget.form);
            }}
          />
          <Link
            onClick={() => {
              let timeout;
              clearTimeout(timeout);
              setTimeout(() => {
                window.location.reload();
              }, 300);
            }}
            to="/dashboard/all-jobs"
            className="btn delete-btn form-btn"
          >
            Reset Search Values
          </Link>
        </div>
      </form>
    </Wrapper>
  );
};

export default SearchContainer;
