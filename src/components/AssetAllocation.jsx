import { Doughnut } from "react-chartjs-2";
import { getClassMap, getCurrentMonth } from "../helper"
import { useEffect, useState } from "react"

const AssetAllocation = ({ data, fy }) => {
  const [equityPercent, setEquityPercent] = useState(0);

  useEffect(() => {
    const equityPercentage = getDebtEquityAllocation();
    setEquityPercent(equityPercentage);
  }, [fy]);

  const getDebtEquityAllocation = () => {
    const classMap = getClassMap();
    const currentMonth = getCurrentMonth();
    const currMonthTotal = data?.[fy]?.[currentMonth]?.total || 0;
    let equityCount = 0;

    Object.keys(classMap).forEach(item => {
      const value = data?.[fy]?.[currentMonth]?.[item];

      if(classMap[item] === "Equity"){
        equityCount += Number(value);
      }
    });

    const equityPercentage = currMonthTotal ? ((equityCount / currMonthTotal) * 100).toFixed(2) : 0;

    return equityPercentage;
  }

  const equityData = {
    labels: ["Equity", "Debt"],
    datasets: [
      {
        data: [equityPercent, 100 - equityPercent],
        backgroundColor: ["#6366F1", "#818CF8"],
        borderWidth: 1,
        cutout: "60%"
      }
    ]
  };
  

  const options = {
    plugins: {
      legend:{
        position: "right",
        labels:{
          generateLabels: (chart) => {
            const { labels } = chart.data;
            const data = chart.data.datasets[0].data;
  
            return labels.map((label, i) => ({
              text: `${label}: ${Number(data[i]).toFixed(2)}%`,
              fillStyle: chart.data.datasets[0].backgroundColor[i],
              index: i,
            }));
          },
        }
      }
    }
  }
    return (
      <div className="card w-[36%]">
        <h4 className="kpi-label">Asset Allocation %</h4>
        <div className="flex justify-center items-center w-[450px] h-[410px]">
          <Doughnut key={"donut"} data={equityData} options={options}/>
        </div>
      </div>
    );
};

export default AssetAllocation;