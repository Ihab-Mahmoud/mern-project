import { ChartsContainer, StatsContainer } from "../components/index.js";

import fetch from "../utils/custom-axios.jsx";
import { useQuery } from "@tanstack/react-query";


const statsQuery = {
  queryKey: ['stats'],
  queryFn: async () => {
    const { data } = await fetch("/jobs/stats", "get");
    return data;
  },
};

export const StatsLoader = (queryClient) => async () => {
  const data = await queryClient.ensureQueryData(statsQuery);
  return data;
};

const Stats = () =>
{
  const data = useQuery(statsQuery);
  return (
    <>
      <StatsContainer data={data?.data} />
      {data?.data?.appGroupStats?.length !== 0 && (
        <ChartsContainer data={data.appGroupStats} />
      )}
    </>
  );
};

export default Stats;
