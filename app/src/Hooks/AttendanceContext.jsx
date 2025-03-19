import React, { createContext, useContext, useMemo, useState } from 'react'
import useStoredData from './useStoredData';

const AttendanceContext = createContext();

export const AttendanceProvider = ({ children }) => {
    const { storedData } = useStoredData()
    const [totalPeriods, setTotalPeriods] = useState(0)
    const [days, setDays] = useState(0)
    const [finalArr, setFinalArr] = useState([])

    const updateMonthlyReport = (prefix) => {
        const filterDateData = storedData.filter((item) => item.date.slice(0, 7) === prefix );
        console.log("filterDateData", filterDateData);

        if (filterDateData.length === 0) {
            setFinalArr([])
            alert(`No Data in the ${prefix} Selected Month`)
        }

        const totalDays = filterDateData.length
        setDays(totalDays)
        console.log("Total Days", totalDays);

        const periods = filterDateData.length * 7
        setTotalPeriods(periods)
        console.log("Total Periods", periods);

        const finalData = {};

        filterDateData.forEach((item) => {
            if (item?.['student']) {
                Object.keys(item?.['student']).forEach((id) => {
                    const count = Object.values(item['student'][id]).filter(value => value === true).length;

                    if (finalData?.[id]) {
                        finalData[id] += count;
                    } else {
                        finalData[id] = count;
                    }
                });
            }
        });

        const finalArrData = [];

        Object.keys(finalData).forEach((id) => {
            finalArrData.push({ studentId: id, count: finalData[id], average: ((finalData[id] / periods) * 100) });
        })
        console.log("finalData", finalArrData);
        setFinalArr(finalArrData)
    }

    const ResultArr = useMemo(() => finalArr, [finalArr]);

    return (
        <AttendanceContext.Provider
            value={{ days, totalPeriods, finalArr: ResultArr, updateMonthlyReport }}>
            {children}
        </AttendanceContext.Provider>
    )
}

export const useAttendanceContext = () => {
    return useContext(AttendanceContext)
}