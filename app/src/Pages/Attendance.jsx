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
  const [save, setSave] = useState('')
  const currentDate = new Date().toISOString().slice(0, 10);
  const [isAfter3, setIsAfter3] = useState(false)
  const { register, handleSubmit, watch, reset } = useForm({
    defaultValues: {
      date: currentDate
    }
  })
  const AttendanceData = import.meta.env.VITE_Attendance
  const PresentDate = format(new Date(), 'yyyy-MM-dd')

  const date = watch("date")

  // Auto submit the data after 5.30pm and enable the submit button after 3pm 
  useEffect(() => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    setIsAfter3(hours >= 15);
    const isAfter530 = hours > 17 || (hours === 17 && minutes >= 30);
    if (isAfter530) { 
      if (Object.keys(existingData).length === 0 && date === currentDate) {
        const timeout = setTimeout(() => {
          handleSubmit(onSubmit)();
        }, 1000);
        return () => clearTimeout(timeout);
      }
    }
  }, [existingData, date, currentDate])

  useEffect(() => {
    if (date) {
      fetchExistingData(date);
    }
  }, [date]);

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

  // Update the Checkbox
  const handleCheck = ((studentId, period) => {
    setAttendance((prevState) => ({
      ...prevState,
      [studentId]: {
        ...prevState[studentId],
        [period]: !prevState[studentId]?.[period],
      },
    }));
  })

  const handleSave = (() => {
    if (Object.keys(attendance).length > 0) {
      localStorage.setItem('attendanceData', JSON.stringify(attendance));
      setSave("Saved the Data");

      setTimeout(() => {
        setSave('');
      }, 1000);
    }
  })

  // Submit the Attendance
  const onSubmit = async () => {
    if (!date) {
      alert('Please select a date.');
      return;
    }

    if (Object.keys(existingData).length === 0) {
      const attendanceData = {
        date,
        student: { ...attendance }
      }

      try {
        await axios.post(`${AttendanceData}`, attendanceData);
        alert(`Attendance submitted for ${FormatDate(date)}`);
        setAttendance({})
        localStorage.removeItem('attendanceData');
        reset()
        window.location.reload();
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

      {save && (
        <p className='text-center'>
          <span className="bg-secondary text-light px-2 py-2 rounded ">
            {save}
          </span>
        </p>
      )}

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
          <button className='btn btn-primary' onClick={handleSave}>
            Save Attendance
          </button>&nbsp;&nbsp;

          <button className="btn btn-success" onClick={handleSubmit(onSubmit)}  disabled={!isAfter3}>
            Submit Attendance
          </button>
        </div>
      )}
    </div>
  );
}

export default Attendance;