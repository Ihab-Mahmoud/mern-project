/* eslint-disable react/prop-types */
import { useState } from "react";
import Wrapper from "../assets/wrappers/ChartsContainer";

import AreaChart from "./areaChart";
import BarChart from "./barChart";

const ChartsContainer = ({data}) => {
    const [barChart, setBarChart] = useState(true);
    console.log(data);
  return (
    <Wrapper>
      <h4>Monthly Applications</h4>
      <button
        type="button"
        onClick={() => {
          setBarChart(!barChart);
        }}
      >
        {barChart ? "Area Chart" : "Bar Chart"}
      </button>

      {barChart ? <BarChart data={data} /> : <AreaChart data={data} />}
    </Wrapper>
  );
};

export default ChartsContainer;
