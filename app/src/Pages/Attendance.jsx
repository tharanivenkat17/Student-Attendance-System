import React, { useState, useEffect } from 'react';
import useAttendance from '../Hooks/useAttendance';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useForm } from 'react-hook-form';
import { FormatDate } from '../utils/FormatDate';
import { format } from 'date-fns';

function Attendance() {
  const { data, error, attendance, setAttendance } = useAttendance();
  const [existingData, setExistingData] = useState({});
  const currentDate = new Date().toISOString().slice(0, 10);
  const { register, handleSubmit, watch, reset } = useForm({
    defaultValues: {
      date: currentDate
    }
  })
  const AttendanceData = import.meta.env.VITE_Attendance
  const PresentDate = format(new Date(), 'yyyy-MM-dd')

  const date = watch("date")

  useEffect(() => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const isAfter620 = hours > 18 || (hours === 18 && minutes >= 23);
    if (isAfter620) {
      if (Object.keys(existingData).length === 0 && date === currentDate) {
        const timeout = setTimeout(() => {
          handleSubmit(onSubmit)();
        }, 1000);
        return () => clearTimeout(timeout);
      }
    }
  }, [existingData, date, currentDate])

  useEffect(() => {
    const savedAttendance = localStorage.getItem('attendanceData');
    if (savedAttendance) {
      setAttendance(JSON.parse(savedAttendance));
    }
  }, []);

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
      const response = await axios.get(`${AttendanceData}?date=${selectedDate}`);
      if (response.data.length > 0) {
        const [{ student: markedAttendance }] = response.data;
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
        student: {
          ...Object.keys(attendance).reduce((acc, studentId) => {
            acc[studentId] = attendance[studentId];
            return acc;
          }, {})
        }
      };

      try {
        await axios.post(`${AttendanceData}`, attendanceData);
        alert(`Attendance submitted for ${FormatDate(date)}`);
        setAttendance({})
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
      <div className="text-center p-5">
        <h1 className="p-1 fs-3">Mark Attendance</h1>
        <label className="p-1">Enter Attendance Date:</label>&nbsp;
        <input
          type="date"
          className="p-1"
          {...register('date')}
          max={PresentDate}
        />
      </div>
      <div className="container">
        {Object.keys(existingData).length > 0 ? (<p className='text-center p-5'>Attendance for this date [{FormatDate(date)}] is already marked</p>) : (
          <table className="table table-bordered text-center">
            <thead>
              <tr>
                <td>S.No</td>
                <td>Name</td>
                <td>Student Id</td>
                {[1, 2, 3, 4, 5, 6, 7].map(period => (
                  <td key={period}>Period {period}</td>
                ))}
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
          </table>)}
      </div>
      {Object.keys(existingData).length > 0 ? null : (
        <div className="text-center pb-5">
          <button className='btn btn-primary'>
            Save Attendance
          </button>&nbsp;&nbsp;
          <button className="btn btn-success" onClick={handleSubmit(onSubmit)}>
            Submit Attendance
          </button>
        </div>
      )}
    </div>
  );
}

export default Attendance;