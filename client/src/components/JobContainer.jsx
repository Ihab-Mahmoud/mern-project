/* eslint-disable react/prop-types */
import Wrapper from "../assets/wrappers/JobsContainer";
import { Job } from "../components/index";
import PageBtnContainer from "./PageBtnContainer";

const JobContainer = ({ jobsData }) =>
{
  const { jobs, totalJobs, numOfPages } = jobsData;

  if (jobs?.length === 0) {
    return (
      <Wrapper>
        <h2>No jobs to display...</h2>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <h5>
        {totalJobs} job{totalJobs > 1 && "s"} found
      </h5>
      <div className="jobs">
        {jobs?.map((job) => {
          return <Job key={job._id} jobs={job} />;
        })}
      </div>

      {numOfPages > 1 && <PageBtnContainer jobsData={jobsData} />}
    </Wrapper>
  );
};

export default JobContainer;
