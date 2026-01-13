import { useEffect, useState } from "react"
import AssetAllocation from "../components/AssetAllocation"
import Kpi from "../components/Kpi"
import NetWorthGraph from "../components/NetWorthGraph"
import { FY } from "../constants"
import { getCurrentFY, setCurrentFY, getTrackerData } from "../storage"

const Dashboard = () => {
    const [financialYear, setFinacialYear] = useState("");
    const [assetData, setAssetData] = useState({});

    useEffect(() => {
        setCurrentFY(FY[0]);
        const fy = getCurrentFY();
        setFinacialYear(fy);
        const data = getTrackerData();
        setAssetData(data);
    }, []);

    return(
        <div className="dashboard">
            <main>
                <Kpi data={assetData} fy={financialYear}/>
                <div className="flex justify-between items-center">
                    <NetWorthGraph data={assetData} fy={financialYear}/>
                    <AssetAllocation data={assetData} fy={financialYear}/>
                </div>
            </main>
        </div>
    )
}

export default Dashboard;