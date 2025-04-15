import React, { useEffect, useMemo, useState } from 'react';
import { useAttendanceContext } from '../Hooks/AttendanceContext';
import { useForm } from 'react-hook-form';
import { FormatDate } from '../utils/FormatDate';
import { FormatMonth } from '../utils/FormatMonth';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';


function MonthlyReport() {
  // Monthly report
  const { days, totalPeriods, finalArr, updateMonthlyReport, filterDateData } = useAttendanceContext();
  const currentMonth = new Date().toISOString().slice(0, 7);
  const { register, watch } = useForm({
    defaultValues: {
      selectedMonth: currentMonth
    }
  });
  const selectedMonth = watch('selectedMonth');
  useEffect(() => {
    if (selectedMonth) {
      updateMonthlyReport(selectedMonth);
    }
  }, [selectedMonth, updateMonthlyReport]);

  // memozied the value of the table
  const resultMonthlyReport = useMemo(() => {
    return finalArr.map((data) => (
      <tr key={data.studentId}>
        <td>{data.studentId}</td>
        <td>{days}</td>
        <td>{totalPeriods}</td>
        <td>{data.count}</td>
        <td>{data.average.toFixed(2)}%</td>
      </tr>
    ));
  }, [finalArr, days, totalPeriods]);

  // group the data and make as array to display all data in that month
  const groupedData = useMemo(() => {
    const grouped = {};

    filterDateData.forEach(datum => {
      const date = datum.date;

      if (!grouped[date]) {
        grouped[date] = [];
      }

      Object.entries(datum.student).forEach(([studentId, periods]) => {
        grouped[date].push({
          studentId,
          ...periods
        });
      })
    });
    return grouped;
  }, [filterDateData]);


  return (
    <div>
      <div className="text-center p-3 flex">
        <h1 className='p-1 fs-3'>Monthly Report</h1>
        {/* input form */}
        <form className='p-1'>
          <input
            type="month"
            className='p-1'
            {...register('selectedMonth', { required: true })}
          />
        </form>
      </div>

      {/* table to display the monthly report */}
      <div className="container p-5">
        <table className='table table-bordered text-center '>
          <thead>
            <tr>
              <td>Student Id</td>
              <td>No.of Working Days</td>
              <td>Total No.of Periods</td>
              <td>No.of Periods Attended</td>
              <td>Percentage</td>
            </tr>
          </thead>
          <tbody>
            {resultMonthlyReport}
          </tbody>
        </table>

        {/* dropdown for filter data of all date in that month */}
        <div className='text-center p-4'>
          <DropdownButton id="dropdown-basic-button" title="Filter data with Student ID">
            <Dropdown.Item >101</Dropdown.Item>
            <Dropdown.Item >102</Dropdown.Item>
            <Dropdown.Item >103</Dropdown.Item>
            <Dropdown.Item >104</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item >All Students</Dropdown.Item>
          </DropdownButton>
        </div>

        {/* To display all data in that month */}
        {Object.keys(groupedData).length === 0 ? (
          <p className='text-center'>No Attendance data {FormatMonth(selectedMonth)} in this month.</p>
        ) : (
          Object.entries(groupedData).map(([date, students]) => (
            <div key={date} className='mb-5'>
              <h5 className='text-center'>Date: {FormatDate(date)}</h5>
              <table className="table table-bordered text-center">
                <thead>
                  <tr>
                    <th>Student Id</th>
                    {[1, 2, 3, 4, 5, 6, 7].map(period => (
                      <th key={period}>Period {period}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {students.map((student, index) => (
                    <tr key={`${student.studentId}-${index}`}>
                      <td>{student.studentId}</td>
                      {[1, 2, 3, 4, 5, 6, 7].map(period => (
                        <td key={period}>
                          <input
                            type="checkbox"
                            checked={student[`period${period}`] || false}
                            readOnly
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className='text-end'>
                <button className='btn btn-success text'> Edit </button>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
}

export default MonthlyReport;
