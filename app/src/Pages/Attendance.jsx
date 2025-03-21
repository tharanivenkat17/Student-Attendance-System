import React, { useState } from 'react';
import useAttendance from '../Hooks/useAttendance';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function Attendance() {
  const { date, setDate, data, error, attendance, setAttendance } = useAttendance();

  // Update the Checkbox
  function handleCheck(studentId, period) {
    setAttendance((prevState) => ({
      ...prevState,
      [studentId]: {
        ...prevState[studentId],
        [period]: !prevState[studentId]?.[period]
      }
    }));
  }

  // Submit the Attendance
  const handleSubmit = () => {
    if (!date) {
      alert("Please select a date.");
      return;
    }

    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:4001/attendance?date=${date}`);
        if (response.data.length > 0) {
          alert('Attendance for this date has already been entered.');
          setDate('');
          return;
        }

        const attendanceData = { date, student: attendance };
        console.log('Attendance Data:', attendanceData);

        await axios.post('http://localhost:4001/attendance', attendanceData);
        alert(`Attendance submitted for ${date}`);
        setDate('');
        setAttendance({});
      } catch (error) {
        alert(`Error submitting attendance: ${error.message}`);
      }
    };
    fetchData();
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <div className="text-center p-3">
        <h1 className='p-1 fs-3'>Mark Attendance</h1>
        <label className='p-1'>Enter Attendance Date:</label>&nbsp;
        <input
          type="date"
          value={date}
          className='p-1'
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <br />
      <div className="container">
        <table className='table table-bordered p-2'>
          <thead>
            <tr>
              <td>S.No</td>
              <td>Name</td>
              <td>Student Id</td>
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
            {data && data.map((datum) => (
              <tr key={datum.id}>
                <td>{datum.id}</td>
                <td>{datum.name}</td>
                <td>{datum.studentId}</td>
                {[1, 2, 3, 4, 5, 6, 7].map((period) => (
                  <td key={period}>
                    <input
                      type="checkbox"
                      checked={attendance[datum.studentId]?.[`period${period}`] || false}
                      onChange={() => handleCheck(datum.studentId, `period${period}`)}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="d-flex justify-content-center" style={{paddingBottom: '30px'}}>
        <button className="btn btn-success" onClick={handleSubmit}>Submit Attendance</button>
      </div>
    </div>
  );
}

export default Attendance;