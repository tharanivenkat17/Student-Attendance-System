import React, { createContext, useContext, useState } from 'react'
import useStoredData from './useStoredData';

const AttendanceContext = createContext();

export const AttendanceProvider = ({ children }) => {
    const { storedData } = useStoredData()
    const [selectedMonth, setselectedMonth] = useState('');
    const [totalPeriods, setTotalPeriods] = useState(0)
    const [finalArr, setFinalArr] = useState([])

    const updateMonthlyReport = (prefix) => {
        const filterDateData = storedData.filter((item) => item.date.slice(0, 7) === prefix);
        console.log("filterDateData", filterDateData);

        if (filterDateData.length === 0) {
            setFinalArr([])
            alert(`No Data in the ${prefix} Selected Month`)
        }

        const periods = filterDateData.length * 7
        setTotalPeriods(periods)
        console.log("TotalPeriods", periods);

        const finalData = {};

        filterDateData.forEach((item) => {
            if (item?.['student']) {
                Object.keys(item?.['student']).forEach((id) => {
                    var count = Object.values(item['student'][id]).filter(value => value === true).length;

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

    return (
        <AttendanceContext.Provider 
            value={{ selectedMonth, setselectedMonth, totalPeriods, finalArr, updateMonthlyReport}}>
            {children}
        </AttendanceContext.Provider>
    )
}

export const useAttendanceContext = () => useContext(AttendanceContext)