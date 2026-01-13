import { ASSETS_LIST } from "./constants"

const currentDate = new Date();

export const getCurrentMonth = () => {
    const monthNameLong = currentDate.toLocaleString('default', { month: 'long' });
    return monthNameLong; 
}

export const getPreviousMonth = () => {
    const previousMonthDate = new Date(currentDate);
    previousMonthDate.setMonth(currentDate.getMonth() - 1);

    const prevMonthNameLong = previousMonthDate.toLocaleString('default', { month: 'long' });
    return prevMonthNameLong; 
}

export const getClassMap = () => {
    return ASSETS_LIST.reduce((acc, asset) => {
        acc[asset.assetId] = asset.class;
        return acc;
    }, {})
}