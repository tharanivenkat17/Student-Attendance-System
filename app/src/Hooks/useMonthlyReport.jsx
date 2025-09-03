import React, { useMemo } from 'react'
import { useAttendanceContext } from './AttendanceContext';

function useMonthlyReport() {
      const { days, totalPeriods, finalArr } = useAttendanceContext();
    // monthly report of the that month
      const resultMonthlyReport = useMemo(() => {
        return finalArr.map((data) => (
          <tr key={data.studentId}>
            <td>{data.studentId}</td>
            <td>{days}</td>
            <td>{totalPeriods}</td>
            <td>{data.count}</td>
            <td>{data.average.toFixed(2)}%</td>
          </tr>
        ));
      }, [finalArr, days, totalPeriods]);
  return { resultMonthlyReport }
}

export default useMonthlyReport