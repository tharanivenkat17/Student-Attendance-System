import React, { useState } from 'react';
import axios from 'axios';
import '../Styles/AttendanceReport.css'

function AttendanceReport() {
  const [data, setData] = useState(0);
  const [result, setResult] = useState([]);

  function handleChange(event) {
    setData(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    axios.get(`http://localhost:4001/attendance?studentId=${data}`)
      .then((response) => {
        const studentData = response.data
        if (!studentData) {
          alert('There is no student with this Student Id, Please enter a valid student id');
        }
        else {
          console.log(studentData)
          setResult(studentData);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        alert('An error occurred while fetching data.');
      });
  }

  return (
    <div className='background'>
      <h1>AttendanceReport</h1>
      <form onSubmit={handleSubmit}>
      <input
          type="number"
          placeholder='Enter Student Id'
          value={data}
          name="data"
          onChange={handleChange}
          required
        /> &nbsp;
        <button type='submit'>Submit</button>
      </form>

      <table border="1" >
        <thead>
          <tr>
            <td>Student Id</td>
            <td>Date</td>
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
          {result.map((datum) => (
            datum.student[data] && (
              <tr key={datum.data}>
                <td>{data}</td>
                <td>{datum.date}</td>
                <td>{datum.student[data].period1 ? "1" : "0"}</td>
                <td>{datum.student[data].period2 ? "1" : "0"}</td>
                <td>{datum.student[data].period3 ? "1" : "0"}</td>
                <td>{datum.student[data].period4 ? "1" : "0"}</td>
                <td>{datum.student[data].period5 ? "1" : "0"}</td>
                <td>{datum.student[data].period6 ? "1" : "0"}</td>
                <td>{datum.student[data].period7 ? "1" : "0"}</td>
              </tr>
            )
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AttendanceReport;
