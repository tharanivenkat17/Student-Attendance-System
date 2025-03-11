import React from 'react'
import '../Styles/Attendance.css'
import useAttendance from '../Hooks/useAttendance'
import axios from 'axios'

function Attendance() {
  const {date, setDate, data, error, attendance, setAttendance } = useAttendance()

      // Handle checkbox
      function handleCheck(studentId, period) {
        setAttendance(prevState => ({
          ...prevState,
          [studentId]: {
            ...prevState[studentId],
            [period]: !prevState[studentId]?.[period]
          }
        }))
      }
    
      // Handle submit
      const handleSubmit = () => {
        if (!date) {
          alert("Please select a date.");
          return;
        }
    
        const attendanceData = { date, attendance };
        console.log('Attendance Data:', attendanceData);
    
        axios.post('http://localhost:4001/attendance', attendanceData)
          .then(() => {
            alert('Attendance submitted');
            setDate('')
            setAttendance({})
          })
          .catch(error => {
            alert('Error submitting attendance:', error);
          });
      };
    
      if (error) {
        return <div>Error: {error}</div>
      }

  return (
    <div className='body'>
      <div className='head'>
        <h1>Attendance Page</h1>
        <h2>10 - A (Attendance Sheet)</h2>
        <label>Enter Today Date:</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </div>
      <table className='table'>
        <thead>
          <tr>
            <td>S.No</td>
            <td>Name</td>
            <td>Studnt Id</td>
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
                <td className='period' key={period}>
                  <input
                    type="checkbox"
                    checked={attendance[datum.id]?.[`period${period}`] || false}
                    //  (?.) - chaining ensures that if attendance[datum.id] is undefined
                    onChange={() => handleCheck(datum.id, `period${period}`)}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={handleSubmit}>Submit Attendance</button>
    </div>
  )
}

export default Attendance
