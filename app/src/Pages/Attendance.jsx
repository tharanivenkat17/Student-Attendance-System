import React, { useState, useEffect } from 'react';
import useAttendance from '../Hooks/useAttendance';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useForm } from 'react-hook-form';
import { FormatDate } from '../utils/FormatDate';

function Attendance() {
  const { data, error, attendance, setAttendance } = useAttendance();
  const [existingData, setExistingData] = useState({});
  const { register, handleSubmit, watch, reset } = useForm()

  const date = watch("date") // instead of separate state for date

  useEffect(() => {
    if (date) {
      fetchExistingData(date);
    }
  }, [date]);

  // Update the Checkbox
  function handleCheck(studentId, period) {
    setAttendance((prevState) => ({
      ...prevState,
      [studentId]: {
        ...prevState[studentId],
        [period]: !prevState[studentId]?.[period],
      },
    }));
  }

  const fetchExistingData = async (selectedDate) => {
    try {
      const response = await axios.get(`http://localhost:4001/attendance?date=${selectedDate}`);
      if (response.data.length > 0) {
        const [{ student: markedAttendance }] = response.data;
        alert(`Attendance for this date[${FormatDate(date)}] is already marked`)
        setExistingData(markedAttendance);
        console.log('Existing Data:', markedAttendance);
      }
      else {
        setExistingData({});
      }
    } catch (error) {
      alert(`Error fetching data: ${error.message}`);
    }
  };

  // Submit the Attendance
  const onSubmit = async () => {
    if (!date) {
      alert('Please select a date.');
      return;
    }

    if (Object.keys(existingData).length === 0) {
      const attendanceData = {
        date,
        students: Object.keys(attendance).map(studentId => ({
          studentId,
          periods: attendance[studentId]
        }))
      };
      console.log('Attendance Data:', attendanceData);

      try {
        await axios.post('http://localhost:4001/attendance', attendanceData);
        alert(`Attendance submitted for ${FormatDate(date)}`);
        reset()
      } catch (error) {
        console.error("Error submitting attendance:", error.response || error.message);
        alert(`Error submitting attendance: ${error.message}`);
      }
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <div className="text-center p-3">
        <h1 className="p-1 fs-3">Mark Attendance</h1>
        <label className="p-1">Enter Attendance Date:</label>&nbsp;
        <input
          type="date"
          className="p-1"
          {...register('date',{required: true})}
        />
      </div>
      <div className="container">
        <table className="table table-bordered text-center">
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
            {data &&
              data.map((datum, index) => (
                <tr key={datum.id}>
                  <td>{index + 1}.</td>
                  <td className='text-start'>{datum.name}</td>
                  <td>{datum.studentId}</td>
                  {[1, 2, 3, 4, 5, 6, 7].map((period) => (
                    <td key={period}>
                      {existingData[datum.studentId] ? (
                        <input
                          type="checkbox"
                          checked={existingData[datum.studentId]?.[`period${period}`] || false}
                        />
                      ) : (
                        <input
                          type="checkbox"
                          checked={attendance[datum.studentId]?.[`period${period}`] || false}
                          onChange={() => handleCheck(datum.studentId, `period${period}`)}
                        />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="text-center pb-5">
        <button className="btn btn-success" onClick={handleSubmit(onSubmit)}>
          Submit Attendance
        </button>
      </div>
    </div>
  );
}

export default Attendance;