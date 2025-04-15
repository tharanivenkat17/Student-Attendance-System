import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useForm } from 'react-hook-form'
import { FormatDate } from '../utils/FormatDate';

function AttendanceReport() {
  const [data, setData] = useState();
  const [result, setResult] = useState([]);
  const [resultSet, setResultSet] = useState([])
  const AttendanceData = import.meta.env.VITE_Attendance
  const { register, handleSubmit, formState: { errors } } = useForm()

  useEffect(() => {
    if (data) {
      calculate(data)
    }
  }, [data])

  const onSubmit = (data) => {
    setData(data.studentId)
  }

  const calculate = async (studentId) => {
    try {
      const response = await axios.get(`${AttendanceData}?studentId=${studentId}`);
      setResult(response.data)
      const filteredData = response.data;
      const finalData = {}

      filteredData.forEach((item) => {
        if (item?.['student']) {
          Object.keys(item?.['student']).forEach((id) => {
            if (id === data) {
              const count = Object.values(item['student'][id]).filter(value => value === true).length;
              finalData[id] = finalData[id] ? finalData[id] + count : count;
            }
          });
        }
      });

      const resultArr = Object.keys(finalData).map(id => ({
        studentId: id,
        average: ((finalData[id] / (filteredData.length * 7)) * 100).toFixed(2),
      }));
      setResultSet(resultArr);

    }
    catch (error) {
      console.error('Error fetching data:', error);
      alert('An error occurred while fetching data.');
    }
  };

  const totalAttendance = resultSet.length > 0 ? resultSet[0].average : null;

  return (
    <div>
      <div className="text-center p-5">
        <h1 className='p-2 fs-3'>Attendance Report</h1>
        <h3 className='p-2 fs-5'>The Student Id is between (101 to 104)</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="number"
            placeholder='Enter Student Id'
            {...register(
              'studentId'
            )}
          />
          {errors.studentId && <span>{errors.studentId.message}</span>}
        </form>

      </div>

      {resultSet.length === 0 && (<p className='text-center'>No student found in {data} this Student ID</p>)}

      {totalAttendance && <h5 className='text-center'>Total Attendance Percentage : {totalAttendance}%</h5>}

      <div className="container p-4">
        <table className="table table-bordered text-center p-2">
          <thead>
            <tr>
              <td>S.No</td>
              <td>Attendance Date</td>
              {[1, 2, 3, 4, 5, 6, 7].map(period => (
                <td key={period}>Period {period}</td>
              ))}
            </tr>
          </thead>
          <tbody>
            {result.map((datum, index) => {
              const studentAttendance = datum.student?.[data];
              if (!studentAttendance) return null;
              return (
                <tr key={datum.date}>
                  <td>{index + 1}.</td>
                  <td>{FormatDate(datum.date)}</td>
                  {[1, 2, 3, 4, 5, 6, 7].map((period) => (
                    <td key={period}>
                      {studentAttendance[`period${period}`] ? "✔" : "❌"}
                    </td>
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