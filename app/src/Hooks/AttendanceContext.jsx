import React, { createContext, useContext, useMemo, useState } from 'react'
import useStoredData from './useStoredData';

const AttendanceContext = createContext();

export const AttendanceProvider = ({ children }) => {
    const { storedData } = useStoredData()
    const [totalPeriods, setTotalPeriods] = useState(0)
    const [days,setDays] = useState(0)
    const [finalArr, setFinalArr] = useState([])
    const [filterDateData, setFilterDateData] = useState([])

    const updateMonthlyReport = (prefix) => {
        const filterValue = storedData.filter((item) =>{
            const itemDate = new Date(item.date) 
            const yearMonth = `${itemDate.getFullYear()}-${(itemDate.getMonth()+1).toString().padStart(2,'0')}`
            return yearMonth === prefix
            // item.date.slice(0, 7) === prefix
        });
        setFilterDateData(filterValue)
          
        console.log("filter Date Data", filterValue);

        if (filterValue.length === 0) {
            setFinalArr([])
            return;
        }

        const totalDays = filterValue.length
        setDays(totalDays)

        const periods = totalDays * 7
        setTotalPeriods(periods)

        const finalData = {};

        // Process Attendance Data for each Id
        filterValue.forEach((item) => {
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

        // converting into an array
        const finalArrData = [];

        Object.keys(finalData).forEach((id) => {
            finalArrData.push({ studentId: id, count: finalData[id], average: ((finalData[id] / periods) * 100) });
        })
        console.log(`Final Data ${finalArrData}`);
        setFinalArr(finalArrData)
    }

    const memoizedFinalArr = useMemo(() => finalArr, [finalArr]);

    return (
        <AttendanceContext.Provider 
            value={{ days, totalPeriods, finalArr:memoizedFinalArr, updateMonthlyReport, filterDateData}}>
            {children}
        </AttendanceContext.Provider>
    )
}

export const useAttendanceContext = () =>{ 
    return useContext(AttendanceContext)
}