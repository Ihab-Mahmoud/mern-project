import { JobContainer, SearchContainer } from "../components/index";
import { toast } from "react-toastify";
import { useLoaderData } from "react-router-dom";
import { customFetch } from "../utils/custom-axios";

export const jobsLoader = async ({ request }) => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);
  try {
    const { data } = await customFetch.get("/jobs", { params });
    return { data, params };
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const Alljobs = () =>
{
  const data = useLoaderData();
  const jobsData = data.data;
  return (
    <>
      <SearchContainer params={data.params} />
      <JobContainer jobsData={jobsData} />
    </>
  );
};

export default Alljobs;
