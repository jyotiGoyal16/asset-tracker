import { useEffect, useState } from "react"
import { getCurrentMonth, getPreviousMonth } from "../helper"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const Kpi = (props) => {    
    const {data, fy} = props;
    const currentMonth = getCurrentMonth();

    const [calcDiff, setCalcDiff] = useState(0);

    const currMonthTotal = data?.[fy]?.[currentMonth]?.total || 0;

    useEffect(() => {
        calcDifference();
    }, [fy])

    const getCurrentNetWorth = () => {
        let value = data?.[fy]?.[currentMonth]?.total || 0;
        return value;
    }

    const calcDifference = () => {
        const prevMonth = getPreviousMonth();
        const prevMonthTotal = data?.[fy]?.[prevMonth]?.total || 0;
        const diffInLakhs =  currMonthTotal - prevMonthTotal;
        setCalcDiff(diffInLakhs.toFixed(2));
    }

    const getYearToDateGain = () => {
        const aprilTotal = data?.[fy]?.["April"]?.total || 0;
        const amountDiff = (currMonthTotal - aprilTotal).toFixed(2);
        const percentage = ((( amountDiff ) / aprilTotal) * 100).toFixed(2);
        return {amountDiff, percentage};
    }

    const getBestMonth = () => {
        let maxGain = 0;
        let bestMonth = "April";
        let prevMonth = "April";

        let fyAssetData = data?.[fy] || null;
        if(fyAssetData !== null){
            Object.keys(fyAssetData).forEach(month => {
                let diff = fyAssetData?.[month]?.total - fyAssetData?.[prevMonth]?.total;
    
                if(diff > maxGain){
                    maxGain = (Math.max(maxGain, diff)).toFixed(2);
                    bestMonth = month;
                }
    
                prevMonth = month;
            });
        }
        return {
            maxGain, bestMonth
        }
    }

    const getWorstMonth = () => {
        let maxLoss = 0;
        let worstMonth = "April";
        let prevMonth = "April";

        let fyAssetData = data?.[fy] || null;
        if(fyAssetData !== null){
            Object.keys(fyAssetData).forEach(month => {
                let diff = fyAssetData?.[month]?.total - fyAssetData?.[prevMonth]?.total;

                if(diff < maxLoss){
                    maxLoss = (Math.min(maxLoss, diff)).toFixed(2);
                    worstMonth = month;
                }
    
                prevMonth = month;
            });    
        }
        return {
            maxLoss: Math.abs(maxLoss), worstMonth
        }
    }

    const {amountDiff, percentage} = getYearToDateGain();
    const {maxGain, bestMonth} = getBestMonth();
    const {maxLoss, worstMonth} = getWorstMonth();

    return (
        <div className="kpis-container">
            <div id="net-worth" className="kpi-card">
                <h4 className="kpi-label">Net worth</h4>
                <div className="kpi-value">
                    <span>₹ {getCurrentNetWorth()}</span>
                    <span className="text-[24px]"> L </span>
                </div>
                <div className={`insights ${calcDiff >= 0 ? "text-green-600" : "text-red-600" }`}>
                    {calcDiff >= 0 
                    ? (<span>▲</span>) 
                    : (<span>▼</span>)}
                    <span> ₹ {calcDiff} L </span>
                    <span className="text-gray-400"> vs last month</span>
                </div>
            </div>
            <div id="gains" className="kpi-card">
                <h4 className="kpi-label">Year-to-date gain</h4>
                <div className="kpi-value">
                    <span>₹ {amountDiff}</span>
                    <span className="text-[24px]"> L </span>
                </div>
                <div className="insights text-green-600">
                    <span>▲</span>
                    <span> {percentage} %</span>
                    <div className="text-gray-400">(Since April)</div>
                </div>
            </div>
            <div id="best-month" className="kpi-card">
                <div className="flex items-center">
                    <div className="text-[20px] pr-[10px] text-green-600">●</div>
                    <h4 className="kpi-label">Best Month</h4>
                </div>
                <div className="kpi-value mx-[30px]">{bestMonth}</div>
                <div className="text-[18px] px-[30px] py-[16px] text-green-600">+ ₹ {maxGain} L</div>
            </div>
            <div id="worst-month" className="kpi-card">
                <div className="flex items-center">
                    <div className="text-[20px] pr-[10px] text-red-600">●</div>
                    <h4 className="kpi-label">Worst Month</h4>
                </div>
                <div className="kpi-value mx-[30px]">{worstMonth}</div>
                <div className="text-[18px] px-[30px] py-[16px] text-red-600">- ₹ {maxLoss} L</div>
            </div>
        </div>
    )
}

export default Kpi;