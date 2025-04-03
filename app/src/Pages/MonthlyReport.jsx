import React, { useEffect, useMemo } from 'react';
import { useAttendanceContext } from '../Hooks/AttendanceContext';
import { useForm } from 'react-hook-form';

function MonthlyReport() {
  const { days, totalPeriods, finalArr, updateMonthlyReport } = useAttendanceContext();

  const { register, watch } = useForm();

  const selectedMonth = watch('selectedMonth');

  useEffect(() => {
    if (selectedMonth) {
      updateMonthlyReport(selectedMonth);
    }
  }, [selectedMonth]);

  const resultMonthlyReport = useMemo(() => {
    return finalArr.map((data) => {
      return (
        <tr key={data.studentId}>
          <td>{data.studentId}</td>
          <td>{days}</td>
          <td>{totalPeriods}</td>
          <td>{data.count}</td>
          <td>{data.average.toFixed(2)}%</td>
        </tr>
      );
    });
  }, [finalArr, days, totalPeriods]);

  return (
    <div>
      <div className="text-center p-4">
        <h1 className='p-1 fs-3'>Monthly Report</h1>
        <form className='p-1'>
          <input
            type="month"
            className='p-1'
            {...register('selectedMonth',{required: true})}
          />
        </form>
      </div>

      <div className="container p-5">
        <table className='table table-bordered text-center mb-5'>
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
      </div>

    </div>
  );
}

export default MonthlyReport;