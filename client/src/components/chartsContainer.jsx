/* eslint-disable react/prop-types */
import { useState } from "react";
import Wrapper from "../assets/wrappers/ChartsContainer.js";

import AreaChart from "./areaChart.jsx";
import BarChart from "./barChart.jsx";

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
