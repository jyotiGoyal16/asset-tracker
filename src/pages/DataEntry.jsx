import { useEffect, useState } from "react"
import { FY_MONTHS, ASSETS_LIST, FY } from "../constants";
import { getCurrentFY, getTrackerData, setTrackerData } from "../storage"

const DataEntry = () => {
    const [financialYear, setFinancialYear] = useState("");
    const [assetData, setAssetData] = useState({});
    const [quickFilterValue, setQuickFilterValue] = useState("");

    useEffect(() => {
        const currFY = getCurrentFY();
        handleFYChange(null, currFY);
    }, [])

    const handleFYChange = (event, value="") => {
        let fy = event?.target?.value || value;
        setFinancialYear(fy);
        const data = getTrackerData();
        setAssetData(prev => {
            return {
                ...prev,
                [fy]: data?.[fy] || {}
            }
        });
    }

    const handleAssetValueUpdate = (event, fy, month, id) => {
        setAssetData(prev => {
            return {
                ...prev,
                [fy]: {
                    ...(prev[fy] || {}),
                    [month]: {
                        ...(prev[fy]?.[month] || {}),
                        [id]: event?.target?.value,
                        total: getTotal(month)
                    }
                }
            }
        });
    }

    const handleSaveClick = () => {
        setTrackerData(assetData);
    }

    const getTotal = (month) => {
        let monthlyAssetValue = assetData[financialYear][month];
        let total = 0;

        for(let asset in monthlyAssetValue){
            if(asset !== "total"){
                if(quickFilterValue){
                    let classValue = ASSETS_LIST.find(el => el.assetId === asset).class.toLowerCase();
                    if(classValue === quickFilterValue){
                        total += Number(monthlyAssetValue[asset]);
                    }
                }else{
                    total += Number(monthlyAssetValue[asset]);
                }
            }
        }

        return total.toFixed(2);
    }

    //Event bubbling used to handle chip click
    const handleChipClick = (event) => {
        let chipValue = event.target.dataset.chipId;
        if(chipValue === quickFilterValue){
            setQuickFilterValue("");
        }else{
            setQuickFilterValue(chipValue);
        }
    }

    return(
        <div>
            <div className="flex justify-between items-center">
                <div className="flex items-center">
                    <div>Select Financial Year: </div>
                    <select className="border-2 m-4 p-1" value={financialYear} onChange={handleFYChange}>
                        <option value="">Select a value</option>
                        {FY.map(fy => <option key={fy} value={fy}>{fy}</option>)}
                    </select>
                </div>
                <button type="button" onClick={handleSaveClick} className="cursor-pointer border-2 px-4 py-2">Save</button>
            </div>
            <div className="flex items-center">
                <div>Quick filters:</div>
                <div className="flex" onClick={handleChipClick}>
                    <div className={`chip ${quickFilterValue === 'debt' ? 'active' : ''}`} data-chip-id="debt">Debt</div>
                    <div className={`chip ${quickFilterValue === 'equity' ? 'active' : ''}`} data-chip-id="equity">Equity</div>
                </div>
            </div>
            <div className="p-[20px]">
                {financialYear ? (<table className="border-collapse border-2 text-left">
                    <thead>
                        <tr className="h-[45px]">
                            <th className="border-2 p-2 w-[22%] text-[14px]">Assets</th>
                            {FY_MONTHS.map(month => <th key={month} className="p-2 w-[200px] text-[14px]">{month.slice(0,3)}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {ASSETS_LIST.map(asset => {
                            return ((!quickFilterValue || quickFilterValue == asset.class.toLowerCase()) && <tr className="border-2" key={asset.assetId}>
                            <td className="p-1 border-2">
                                <p className="text-[14px]">{asset.name}</p>
                                <p className="text-gray-400 text-[11px]">{asset.class}</p>
                            </td>
                            {FY_MONTHS.map(month => <td key={`${asset.assetId}_${month}`} className="w-[200px] text-[14px] p-1 text-left">
                                <input 
                                    type="number" 
                                    value={assetData?.[financialYear]?.[month]?.[asset.assetId] || ""}
                                    onChange={(event) => handleAssetValueUpdate(event, financialYear, month, asset.assetId)}
                                    className="w-full text-left border border-none rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"/>
                            </td>)}
                        </tr>)
                        })}
                        <tr className="border-2">
                            <td className="p-1 border-2">Total</td>
                            {FY_MONTHS.map(month => <td key={`total_${financialYear}_${month}`} className="w-[200px] text-[14px] px-3 text-left">{getTotal(month)}</td>)}
                        </tr>
                    </tbody>
                </table>) : (<p>Please select a financial year to check or modify entries!</p>)}
            </div>
        </div>
    )
}

export default DataEntry;