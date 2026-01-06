import { useEffect } from "react"
import { FY } from "../constants"
import { setCurrentFY } from "../storage"

const Dashboard = () => {
    useEffect(() => {
        setCurrentFY(FY[0]);
    }, []);

    return(
        <div>Dashboard</div>
    )
}

export default Dashboard;