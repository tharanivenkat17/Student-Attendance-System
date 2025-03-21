import React, { useMemo, useState } from 'react';
import axios from 'axios';
import '../Styles/ReportsPage.css'
import 'bootstrap/dist/css/bootstrap.min.css';

function AttendanceReport() {
  const [data, setData] = useState(0);
  const [result, setResult] = useState([]);

  function handleSubmit(event) {
    event.preventDefault();
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:4001/attendance?studentId=${data}`)
        const studentData = response.data
        if (!studentData) {
          alert('There is no student with this Student Id, Please enter a valid student id');
        }
        else {
          console.log(studentData)
          setResult(studentData);
        }
      }
      catch (error) {
        console.error('Error fetching data:', error);
        alert('An error occurred while fetching data.');
      }
    }
    fetchData();
  }

  const memoizedResult = useMemo(() => result, [result])

  return (
    <div>
      <div className="text-center p-4">
        <h1 className='p-1 fs-3'>Attendance Report</h1>
        <h3 className='p-1 fs-5'>The Student Id is between (101 to 104)</h3>
        <form className='p-2' onSubmit={handleSubmit}>
          <label>Enter Student Id:</label>&nbsp;
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

      <div className="container p-4">
        <table className='table table-bordered p-2'>
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
            {memoizedResult.map((datum) => {
              const studentAttendance = datum.student[data];
              if (!studentAttendance) return null;
              return (
                <tr key={datum.data}>
                  <td>{datum.date}</td>
                  {[1, 2, 3, 4, 5, 6, 7].map((period) => (
                    <td key={period}>{studentAttendance[`period${period}`] ? "1" : "0"}</td>
                  ))}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AttendanceReport;