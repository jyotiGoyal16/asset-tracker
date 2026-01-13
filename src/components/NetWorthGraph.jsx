import { useEffect, useState } from "react"
import { Line } from "react-chartjs-2"

const NetWorthGraph = ({data, fy}) => {
    const [labels, setLabels] = useState([]);
    const [lineData, setLineData] = useState([]);

    useEffect(() => {
        if(data?.[fy]){
            const chartLabels = data && Object.keys(data?.[fy]).map(label => label.slice(0, 3));
            setLabels(chartLabels);

            const lineChartData = Object.keys(data?.[fy]).map(label => data?.[fy]?.[label]?.total);
            setLineData(lineChartData);
        }
    }, [fy]);

    
    
    
    const netWorthData = {
        labels: labels,
        datasets: [{
            label: 'Net worth',
            data: lineData,
            fill: true,
            borderColor: 'rgb(75, 192, 192)',
        }]
    };

    const options = {
        plugins: {
            legend: false
        }
    }

    return (
        <div className="card w-[60%]">
            <h4 className="kpi-label">Net worth over time (in Lakhs)</h4>
            <div className="flex justify-center items-center h-[330px] mt-[15px]">
                <Line key={"line"} data={netWorthData} options={options}/>
            </div>
        </div>
    )
}

export default NetWorthGraph;