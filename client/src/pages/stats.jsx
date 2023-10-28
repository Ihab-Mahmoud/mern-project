

import { useLoaderData } from "react-router-dom";
import { ChartsContainer, StatsContainer } from "../components/index"

import fetch from "../utils/custom-axios"

export const StatsLoader = async () =>
{
  try {
    const { data } = await fetch("/jobs/stats", "get")
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}


const Stats = () =>
{
  const data = useLoaderData()
  return (
    <>
      <StatsContainer data={data} />
      {data.appGroupStats.length !== 0 && <ChartsContainer data={data.appGroupStats} />}
    </>
  );
}

export default Stats;