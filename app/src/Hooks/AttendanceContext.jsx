import React, { createContext, useContext, useMemo, useState } from 'react'
import useStoredData from './useStoredData';

const AttendanceContext = createContext();

export const AttendanceProvider = ({ children }) => {
    const { storedData } = useStoredData()
    const [selectedMonth, setselectedMonth] = useState('');
    const [totalPeriods, setTotalPeriods] = useState(0)
    const [days,setDays] = useState(0)
    const [finalArr, setFinalArr] = useState([])

    const updateMonthlyReport = (prefix) => {
        const filterDateData = storedData.filter((item) => item.date.slice(0, 7) === prefix);
        console.log("filterDateData", filterDateData);

        if (filterDateData.length === 0) {
            setFinalArr([])
            alert(`No Data in the ${prefix} Selected Month`)
            return;
        }

        const totalDays = filterDateData.length
        setDays(totalDays)

        const periods = filterDateData.length * 7
        setTotalPeriods(periods)
        console.log(`Total Days - ${totalDays} TotalPeriods - ${periods}`);

        const finalData = {};

        // Process Attendance Data for each Id
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

    const memoizedFinalArr = useMemo(() => finalArr, [finalArr]);

    return (
        <AttendanceContext.Provider 
            value={{ selectedMonth, setselectedMonth, days, totalPeriods, finalArr:memoizedFinalArr, updateMonthlyReport}}>
            {children}
        </AttendanceContext.Provider>
    )
}

export const useAttendanceContext = () =>{ 
    return useContext(AttendanceContext)
}