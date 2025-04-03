import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function AttendanceReport() {
  const [data, setData] = useState();
  const [result, setResult] = useState([]);
  const [resultSet, setResultSet] = useState([])

  function handleSubmit(event) {
    event.preventDefault();
    const calculate = async () => {
      try {
        const response = await axios.get(`http://localhost:4001/attendance?studentId=${data}`)
        if (response.data) {
          setResult(response.data);

          const filteredData = response.data

          if (filteredData.length === 0) {
            setResultSet([])
            alert(`No Data in this ${data} Student ID`)
            return
          }

          const finalData = {};

          filteredData.forEach((item) => {
            if (item?.['student']) {
              Object.keys(item?.['student']).forEach((id) => {
                if (id === data) {
                  const count = Object.values(item['student'][id]).filter(value => value === true).length;

                  if (finalData[id]) {
                    finalData[id] += count;
                  } else {
                    finalData[id] = count;
                  }
                }
              });
            }
          });

          const resultArr = Object.keys(finalData).map(id => ({
            studentId: id,
            average: ((finalData[id] / (filteredData.length * 7)) * 100).toFixed(2),
          }));

          setResultSet(resultArr);
        } else {
          setResultSet([]);
          alert('No data found for this student ID.');
        }
      }
      catch (error) {
        console.error('Error fetching data:', error);
        alert('An error occurred while fetching data.');
      }
    }
    calculate()
  }

  const totalAttendance = resultSet.length > 0 ? resultSet[0].average : null;

  return (
    <div>
      <div className="text-center p-5">
        <h1 className='p-1 fs-3'>Attendance Report</h1>
        <h3 className='p-1 fs-5'>The Student Id is between (101 to 104)</h3>
        <form className='p-2' onSubmit={handleSubmit}>
          <input
            type="number"
            placeholder='Enter Student Id'
            value={data}
            name="data"
            onChange={(e) => setData(e.target.value)}
            required
          /> &nbsp;
        </form>
      </div>

      {totalAttendance && <h5 className='text-center '>Total Attendance Percentage of {data}: {totalAttendance}%</h5>}

      <div className="container p-4">
        <table className="table table-bordered text-center p-2">
          <thead>
            <tr>
              <td>Attendance Date</td>
              <td>Period 1</td>
              <td>Period 2</td>
              <td>Period 3</td>
              <td>Period 4</td>
              <td>Period 5</td>
              <td>Period 6</td>
              <td>Period 7</td>
            </tr>
          </thead>
          <tbody>
            {result.map((datum) => {
              const studentAttendance = datum.student[data];
              if (!studentAttendance) return null;
              return (
                <tr key={datum.date}>
                  <td>{datum.date}</td>
                  {[1, 2, 3, 4, 5, 6, 7].map((period) => (
                    <td key={period}>{studentAttendance[`period${period}`] ? "✔" : "❌"}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AttendanceReport