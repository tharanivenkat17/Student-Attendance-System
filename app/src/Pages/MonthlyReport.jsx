import React, { useEffect, useState } from 'react';
import '../Styles/MonthlyReport.css';
import useStoredData from '../Hooks/useStoredData';

function MonthlyReport() {
  const {storedData} = useStoredData()
  const [selectedMonth, setselectedMonth] = useState('');
  const [totalPeriods, setTotalPeriods] = useState(0)
  const [finalArr, setFinalArr] = useState([])

  function dateChange(event) {
    const prefix = event.target.value;
    setselectedMonth(prefix);

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