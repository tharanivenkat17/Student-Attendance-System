// import React, { useState, useEffect } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { useForm } from 'react-hook-form';
// import axios from 'axios';

// import '../Styles/Attendance.css'
// import useAttendance from '../Hooks/useAttendance';
// import { FormatDate } from '../utils/FormatDate';

// function Attendance() {
//   const { data, error, attendance, setAttendance } = useAttendance();
//   const [save, setSave] = useState('');
//   const [isAfter3, setIsAfter3] = useState(false);
//   const [attendanceMarked, setAttendanceMarked] = useState(false);
//   const currentDate = new Date().toISOString().slice(0, 10);  // Today’s date
//   const { handleSubmit, reset } = useForm({
//     defaultValues: { date: currentDate }
//   });

//   const AttendanceData = import.meta.env.VITE_Attendance;

//   useEffect(() => {
//     const now = new Date();
//     const hours = now.getHours();
//     const minutes = now.getMinutes();
//     setIsAfter3(hours >= 15);
//     const isAfter530 = hours > 17 || (hours === 17 && minutes >= 30);

//     if (isAfter530) {
//       if (Object.keys(attendance).length === 0) {
//         const timeout = setTimeout(() => {
//           handleSubmit(onSubmit)();
//         }, 1000);
//         return () => clearTimeout(timeout);
//       }
//     }
//   }, [attendance]);

//   useEffect(() => {
//     const fetchExistingAttendance = async () => {
//       try {
//         const response = await axios.get(`${AttendanceData}?date=${currentDate}`);
//         const existing = response.data.find(entry => entry.isAttendance === true);
//         if (existing) {
//           setAttendanceMarked(true);
//         } else {
//           setAttendanceMarked(false);
//         }
//       } catch (error) {
//         console.error('Error fetching existing attendance:', error);
//       }
//     };

//     fetchExistingAttendance();
//   }, [currentDate]);

//   // Update the checkbox values
//   const handleCheck = (studentId, period) => {
//     setAttendance(prevState => ({
//       ...prevState,
//       [studentId]: {
//         ...prevState[studentId],
//         [period]: !prevState[studentId]?.[period],
//       },
//     }));
//   };

//   // Save attendance
//   const handleSave = async () => {
//     if (Object.keys(attendance).length === 0) return;

//     const attendanceData = {
//       date: currentDate,
//       student: { ...attendance },
//       isAttendance: false,
//     };

//     try {
//       // Check if attendance already exists for the day
//       const existing = await axios.get(`${AttendanceData}?date=${currentDate}&isAttendance=false`);

//       if (existing.data.length > 0) {
//         const existingEntry = existing.data[0];
//         await axios.put(`${AttendanceData}/${existingEntry.id}`, {
//           ...existingEntry,
//           student: attendanceData.student,
//         });
//         setSave('Attendance updated');
//       } else {
//         // Create a new entry for the day
//         const allEntries = await axios.get(`${AttendanceData}`);
//         const lastId = allEntries.data.reduce((maxId, entry) => Math.max(maxId, entry.id), 0);
//         const newId = lastId + 1;

//         await axios.post(`${AttendanceData}`, {
//           ...attendanceData,
//           id: newId
//         });

//         setSave('Attendance saved');
//       }

//       setTimeout(() => setSave(''), 1000);
//     } catch (error) {
//       console.error("Error saving attendance:", error);
//       alert(`Error saving attendance: ${error.message}`);
//     }
//   };

//   // Submit the attendance data
//   const onSubmit = async () => {
//     const attendanceData = {
//       date: currentDate,
//       student: { ...attendance },
//       isAttendance: true
//     };

//     try {
//       await axios.post(`${AttendanceData}`, attendanceData);
//       setAttendanceMarked(true);  
//       setAttendance({});
//       reset();
//       window.location.reload();
//     } catch (error) {
//       console.error("Error submitting attendance:", error.response || error.message);
//       alert(`Error submitting attendance: ${error.message}`);
//     }
//   };

//   if (error) {
//     return <div>Error: {error}</div>;
//   }
// return (
//   <div className="attendance-container">
//     <div className="attendance-header text-center p-2">
//       <h1 className="p-1 fs-3">Mark Attendance</h1>
//       <label className="attendance-date-label">Attendance Date:</label>&nbsp;
//       <span className="attendance-date-text">{FormatDate(currentDate)}</span>
//     </div>

//     {save && (
//       <p className="message-box bg-secondary text-center">{save}</p>
//     )}

//     {attendanceMarked ? (
//       <p className="message-box bg-success text-center">
//         Attendance is already marked for {FormatDate(currentDate)}
//       </p>
//     ) : (
//       <div className="container">
//           <table className="table table-bordered text-center">
//             <thead>
//               <tr>
//                 <td>S.No</td>
//                 <td>Name</td>
//                 <td>Student Id</td>
//                 {[1, 2, 3, 4, 5, 6, 7].map(period => (
//                   <td key={period}>Period {period}</td>
//                 ))}
//               </tr>
//             </thead>

//             <tbody>
//               {data &&
//                 data.map((datum, index) => (
//                   <tr key={datum.id}>
//                     <td>{index + 1}.</td>
//                     <td className="text-start">{datum.name}</td>
//                     <td>{datum.studentId}</td>
//                     {[1, 2, 3, 4, 5, 6, 7].map((period) => (
//                       <td key={period}>
//                         <input
//                           type="checkbox"
//                           checked={attendance[datum.studentId]?.[`period${period}`] || false}
//                           onChange={() => handleCheck(datum.studentId, `period${period}`)}
//                           disabled={attendanceMarked} // Disable checkboxes if attendance is marked
//                         />
//                       </td>
//                     ))}
//                   </tr>
//                 ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       <div className="text-center pb-5">
//         {!attendanceMarked && (
//           <>
//             <button className="btn btn-primary" onClick={handleSave}>
//               Save Attendance
//             </button>&nbsp;&nbsp;

//             <button className="btn btn-success" onClick={handleSubmit(onSubmit)} disabled={!isAfter3}>
//               Submit Attendance
//             </button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Attendance;

import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useForm } from 'react-hook-form';
import axios from 'axios';

import '../Styles/Attendance.css';
import useAttendance from '../Hooks/useAttendance';
import { FormatDate } from '../utils/FormatDate';

function Attendance() {
  const { data, error, attendance, setAttendance } = useAttendance();
  const [save, setSave] = useState('');
  const [isAfter3, setIsAfter3] = useState(false);
  const [attendanceMarked, setAttendanceMarked] = useState(false);
  const currentDate = new Date().toISOString().slice(0, 10);
  const { handleSubmit, reset } = useForm({
    defaultValues: { date: currentDate }
  });

  const AttendanceData = import.meta.env.VITE_Attendance;

  // Load saved attendance from backend or fallback to localStorage on mount
  useEffect(() => {
    const fetchSavedAttendance = async () => {
      try {
        const response = await axios.get(`${AttendanceData}?date=${currentDate}&isAttendance=false`);
        if (response.data.length > 0) {
          setAttendance(response.data[0].student || {});
        } else {
          // fallback to localStorage
          const savedAttendance = localStorage.getItem(`attendance-${currentDate}`);
          if (savedAttendance) {
            setAttendance(JSON.parse(savedAttendance));
          }
        }
      } catch (err) {
        console.error('Error fetching saved attendance:', err);
      }
    };

    fetchSavedAttendance();

    // Check if current time is after 3 PM
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    setIsAfter3(hours >= 15);

    // Auto submit attendance if after 5:30 PM and no attendance marked yet
    const isAfter530 = hours > 17 || (hours === 17 && minutes >= 30);
    if (isAfter530) {
      if (Object.keys(attendance).length === 0) {
        const timeout = setTimeout(() => {
          handleSubmit(onSubmit)();
        }, 1000);
        return () => clearTimeout(timeout);
      }
    }
  }, []); // Run only once on mount

  // Check if attendance already submitted (isAttendance === true)
  useEffect(() => {
    const fetchExistingAttendance = async () => {
      try {
        const response = await axios.get(`${AttendanceData}?date=${currentDate}`);
        const existing = response.data.find(entry => entry.isAttendance === true);
        if (existing) {
          setAttendanceMarked(true);
        } else {
          setAttendanceMarked(false);
        }
      } catch (error) {
        console.error('Error fetching existing attendance:', error);
      }
    };

    fetchExistingAttendance();
  }, [currentDate]);

  const handleCheck = (studentId, period) => {
    setAttendance(prevState => ({
      ...prevState,
      [studentId]: {
        ...prevState[studentId],
        [period]: !prevState[studentId]?.[period],
      },
    }));
  };

  const handleSave = async () => {
    if (Object.keys(attendance).length === 0) return;

    const attendanceData = {
      date: currentDate,
      student: { ...attendance },
      isAttendance: false,
    };

    try {
      // Check if saved attendance exists, update it if yes
      const existing = await axios.get(`${AttendanceData}?date=${currentDate}&isAttendance=false`);
      if (existing.data.length > 0) {
        const existingEntry = existing.data[0];
        await axios.put(`${AttendanceData}/${existingEntry.id}`, {
          ...existingEntry,
          student: attendanceData.student,
        });
        setSave('Attendance updated');
      } else {
        // Otherwise, create new saved attendance
        const allEntries = await axios.get(`${AttendanceData}`);
        const lastId = allEntries.data.reduce((maxId, entry) => Math.max(maxId, entry.id), 0);
        const newId = lastId + 1;

        await axios.post(`${AttendanceData}`, {
          ...attendanceData,
          id: newId
        });

        setSave('Attendance saved');
      }

      // Save attendance to localStorage as a fallback
      localStorage.setItem(`attendance-${currentDate}`, JSON.stringify(attendance));

      setTimeout(() => setSave(''), 1000);
    } catch (error) {
      console.error("Error saving attendance:", error);
      alert(`Error saving attendance: ${error.message}`);
    }
  };

  const onSubmit = async () => {
    const attendanceData = {
      date: currentDate,
      student: { ...attendance },
      isAttendance: true
    };

    try {
      // Check for existing saved (unsubmitted) attendance to mark as submitted
      const existing = await axios.get(`${AttendanceData}?date=${currentDate}&isAttendance=false`);
      if (existing.data.length > 0) {
        const entry = existing.data[0];
        await axios.put(`${AttendanceData}/${entry.id}`, {
          ...entry,
          isAttendance: true,
          student: attendanceData.student,
        });
      } else {
        // If no saved attendance, just post a new submission
        await axios.post(`${AttendanceData}`, attendanceData);
      }

      setAttendanceMarked(true);
      setAttendance({});
      reset();

      // Clear saved data from localStorage fallback
      localStorage.removeItem(`attendance-${currentDate}`);

      window.location.reload();
    } catch (error) {
      console.error("Error submitting attendance:", error.response || error.message);
      alert(`Error submitting attendance: ${error.message}`);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <div className="attendance-header text-center p-2">
        <h1 className="p-1 fs-3">Mark Attendance</h1>
        <label className="attendance-date-label">Attendance Date:</label>&nbsp;
        <span className="attendance-date-text">{FormatDate(currentDate)}</span>
      </div>

      {save && (
        <p className="message-box bg-secondary text-center">{save}</p>
      )}

      {attendanceMarked ? (
        <p className="message-box bg-success text-center">
          Attendance is already marked for {FormatDate(currentDate)}
        </p>
      ) : (
        <div className="container">
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
                    <td className="text-start">{datum.name}</td>
                    <td>{datum.studentId}</td>
                    {[1, 2, 3, 4, 5, 6, 7].map((period) => (
                      <td key={period}>
                        <input
                          type="checkbox"
                          checked={attendance[datum.studentId]?.[`period${period}`] || false}
                          onChange={() => handleCheck(datum.studentId, `period${period}`)}
                          disabled={attendanceMarked}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="text-center pb-2">
        {!attendanceMarked && (
          <>
            <button className="btn btn-primary" onClick={handleSave}>
              Save Attendance
            </button>&nbsp;&nbsp;

            <button className="btn btn-success" onClick={handleSubmit(onSubmit)} disabled={!isAfter3}>
              Submit Attendance
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Attendance;
