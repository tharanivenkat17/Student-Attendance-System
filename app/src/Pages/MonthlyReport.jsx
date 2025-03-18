import React from 'react';
import '../Styles/ReportsPage.css'
import { useAttendanceContext } from '../Hooks/AttendanceContext';

function MonthlyReport() {

  const { selectedMonth, setselectedMonth, totalPeriods, finalArr,updateMonthlyReport} = useAttendanceContext();

  function dateChange(event) {
    const prefix = event.target.value;
    setselectedMonth(prefix);
    updateMonthlyReport(prefix)
  }

  return (
    <div className="background">
      <h1>Monthly Report</h1>
      <form>
        <input
          type="month"
          value={selectedMonth}
          onChange={dateChange}
          required
        />
      </form>
      <table border={1} style={{borderCollapse: "collapse"}}>
        <thead>
          <tr>
            <td>Student Id</td>
            <td>No.of Periods</td>
            <td>No.of Periods Attended</td>
            <td>Percentage</td>
          </tr>
        </thead>
        <tbody>
          {finalArr.map((data) => {
            return (
              <tr key={data.studentId}>
                <td>{data.studentId}</td>
                <td>{totalPeriods}</td>
                <td>{data.count}</td>
                <td>{data.average.toFixed(2)}%</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  );
}

export default MonthlyReport;