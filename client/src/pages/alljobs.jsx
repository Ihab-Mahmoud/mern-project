/* eslint-disable react-refresh/only-export-components */
import { useLoaderData } from "react-router-dom";
import { JobContainer, SearchContainer } from "../components/index.js";
// import { useLoaderData } from "react-router-dom";
import { customFetch } from "../utils/custom-axios.jsx";
import { useQuery } from "@tanstack/react-query";

const jobsQuery = (params) =>
{
  const {search,jobStatus,jobType,sort,page}=params;
  return {
    queryKey: [
      "jobs",
      search ?? "",
      jobStatus ?? "all",
      jobType ?? "all",
      sort ?? "newest",
      page ?? 1,
    ],
    queryFn: async () => {
      const { data } = await customFetch.get("/jobs", { params });
      return data;
    },
  };
};

export const jobsLoader =
  (queryClient) =>
  async ({ request }) => {
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);
    const data  = await queryClient.ensureQueryData(jobsQuery(params));
    return {params,data};
  };

const Alljobs = () => {
  const { params } = useLoaderData();
  const {data} = useQuery(jobsQuery(params));
  return (
    <>
      <SearchContainer params={params} />
      <JobContainer jobsData={data} />
    </>
  );
};

export default Alljobs;
