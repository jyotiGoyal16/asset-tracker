
export const getTrackerData = () => {
    const data = localStorage.getItem("asset-tracker") || null;
    if(data){
        return JSON.parse(data);
    }
}

export const setTrackerData = (data) => {
    localStorage.setItem("asset-tracker", JSON.stringify(data));
}

export const setCurrentFY = (fy) => {
    localStorage.setItem("currFY", fy);
}

export const getCurrentFY = () => {
    const currFY = localStorage.getItem("currFY");
    return currFY;
}