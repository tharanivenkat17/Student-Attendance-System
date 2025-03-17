import React from 'react'
import '../Styles/Attendance.css'
import useAttendance from '../Hooks/useAttendance'
import axios from 'axios'

function Attendance() {
  const { date, setDate, data, error, attendance, setAttendance } = useAttendance()

  function handleCheck(studentId, period) {
    setAttendance(prevState => ({
      ...prevState,
      [studentId]: {
        ...prevState[studentId],
        [period]: !prevState[studentId]?.[period]
      }
    }))
  }

  const handleSubmit = () => {
    if (!date) {
      alert("Please select a date.");
      return;
    }

    axios.get(`http://localhost:4001/attendance?date=${date}`)
      .then((response) => {
        if (response.data.length === 0) {
          const attendanceData = { date, student: attendance };
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
        }
        else {
          alert('Attendance for this date is already entered, Please enter valid date')
          setDate('')
        }
      })
  };

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div className='body'>
      <div className='head'>
        <h1> Mark Attendance </h1>
        <label>Enter Attendance Date:</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </div>
      <table className='table'>
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
                <td className='period' key={period}>
                  <input
                    type="checkbox"
                    checked={attendance[datum.studentId]?.[`period${period}`] || false}
                    // [`period${period}`] - dynamic access the attendance
                    // || false - not clicked it will assume as false
                    onChange={() => handleCheck(datum.studentId, `period${period}`)}
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