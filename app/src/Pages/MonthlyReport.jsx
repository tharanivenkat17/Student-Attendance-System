import React, { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormatDate } from '../utils/FormatDate';
import { FormatMonth } from '../utils/FormatMonth';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import useMonthlyReport from '../Hooks/useMonthlyReport';
import { useAttendanceContext } from '../Hooks/AttendanceContext';
import useDropDown from '../Hooks/useDropDown';
import useEditSave from '../Hooks/useEditSave';
import { useUserName } from '../Hooks/UserContext';

function MonthlyReport() {
  const { updateMonthlyReport, filterDateData } = useAttendanceContext();
  const { resultMonthlyReport } = useMonthlyReport();
  const { studentIds, selectStudentID, setSelectStudentID } = useDropDown();
  const { editedData, setEditedData, saveEditedAttendance } = useEditSave();
  const { userName } = useUserName();

  const [editDate, setEditDate] = useState(null);
  const currentMonth = new Date().toISOString().slice(0, 7);

  const { register, watch } = useForm({
    defaultValues: {
      selectedMonth: currentMonth
    }
  });
  const selectedMonth = watch('selectedMonth');

  // to select the month
  useEffect(() => {
    if (selectedMonth) {
      updateMonthlyReport(selectedMonth);
    }
  }, [selectedMonth]);

  // Data in that specific month
  const specificMonthData = useMemo(() => {
    const monthData = {};
    filterDateData.forEach((datum) => {
      const date = datum.date;
      if (!monthData[date]) monthData[date] = [];
      Object.entries(datum.student).forEach(([studentId, periods]) => {
        monthData[date].push({ studentId, ...periods });
      });
    });
    return monthData;
  }, [filterDateData]);

  // Function to handle the Edit/Save button click
  const handleEditSave = async () => {
    if (editDate) {
      for (const date of Object.keys(editedData)) {
        await saveEditedAttendance(date, editedData[date]);
      }
      setEditDate(null);
    } else {

      const initialEdited = {};
      Object.entries(specificMonthData).forEach(([date, students]) => {
        initialEdited[date] = students.map((s) => ({ ...s }));
      });
      setEditedData(initialEdited);
      setEditDate('editing');

      // const initialEdited = {};
      // Object.entries(specificMonthData).forEach(([date, students]) => {
      //   initialEdited[date] = students.map((s) => ({ ...s }));
      // });
      // setEditedData(initialEdited);
      // setEditDate('editing');
    }
  };


  return (
    <div>
      {/* Input field with current month */}
      <div className="text-center p-3 flex">
        <h1 className="p-1 fs-3">Monthly Report</h1>
        <form className="p-1">
          <input
            type="month"
            className="p-1"
            {...register('selectedMonth')}
            max={currentMonth}
          />
        </form>
      </div>

      <div className="container p-5">
        {/* table to display the monthly report */}
        <table className="table table-bordered text-center">
          <thead>
            <tr>
              <td>Student Id</td>
              <td>No.of Working Days</td>
              <td>Total No.of Periods</td>
              <td>No.of Periods Attended</td>
              <td>Percentage</td>
            </tr>
          </thead>
          <tbody>{resultMonthlyReport}</tbody>
        </table>

        {/* dropdown to filter the data with student Id */}
        <div className="text-center p-4">
          <DropdownButton
            id="dropdown-basic-button"
            title={`Filter by Student ID (${selectStudentID})`}
          >
            {studentIds.length > 0 ? (
              studentIds.map((id) => (
                <Dropdown.Item key={id} onClick={() => setSelectStudentID(id)}>
                  {id}
                </Dropdown.Item>
              ))
            ) : (
              <Dropdown.Item disabled>No student IDs available</Dropdown.Item>
            )}
            <Dropdown.Divider />
            <Dropdown.Item onClick={() => setSelectStudentID('Select ID')}>
              Select ID
            </Dropdown.Item>
          </DropdownButton>
        </div>


        {/* check whether there is a data in that month or not */}
        {selectStudentID !== 'Select ID' &&
          (Object.keys(specificMonthData).length === 0 ? (
            <p className="text-center">
              No Attendance data {FormatMonth(selectedMonth)} in this month.
            </p>
          ) : (
            <div>
              {selectStudentID !== 'Select ID' &&
                <h4 className='text-center p-3'>Displaying the records of the student ID {selectStudentID}</h4>
              }
              <table className="table table-bordered text-center">
                <thead>
                  <tr>
                    <th>Date</th>
                    {[1, 2, 3, 4, 5, 6, 7].map((period) => (
                      <th key={period}>Period {period}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(specificMonthData).map(([date, students]) => {

                    const filteredStudents = students.filter((s) => s.studentId === selectStudentID);

                    return filteredStudents.map((student, index) => {
                      const isFirstRow = index === 0;
                      const isEditing = !!editDate;

                      return (
                        <tr key={`${date}-${student.studentId}`}>
                          {isFirstRow && (
                            <td rowSpan={filteredStudents.length}>{FormatDate(date)}</td>
                          )}
                          {[1, 2, 3, 4, 5, 6, 7].map((period) => {
                            // const checked =
                            //   isEditing && editedData[date]?.[index]
                            //     ? editedData[date][index][`period${period}`] || false
                            //     : student[`period${period}`] || false;

                            const editedStudent = editedData[date]?.find(s => s.studentId === student.studentId);

                            const checked =
                              isEditing && editedStudent
                                ? editedStudent[`period${period}`] || false
                                : student[`period${period}`] || false;


                            return (
                              <td key={period}>
                                <input
                                  type="checkbox"
                                  checked={checked}
                                  readOnly={!isEditing}
                                  onChange={(e) => {
                                    if (isEditing) {
                                      setEditedData((prev) => {

                                        const updated = [...(prev[date] || students)];
                                        const studentIndex = updated.findIndex(s => s.studentId === student.studentId);
                                        if (studentIndex !== -1) {
                                          updated[studentIndex] = {
                                            ...updated[studentIndex],
                                            [`period${period}`]: e.target.checked,
                                          };
                                        }

                                        // const updated = [...(prev[date] || students)];
                                        // updated[index] = {
                                        //   ...updated[index],
                                        //   [`period${period}`]: e.target.checked,
                                        // };
                                        return { ...prev, [date]: updated };
                                      });
                                    }
                                  }}
                                />
                              </td>
                            );
                          })}
                        </tr>
                      );
                    });
                  })}
                </tbody>
              </table>
            </div>

          ))}

        {/* button to edit and save */}
        <div className="text-end">
          {userName == 'Principal@123' &&
            (selectStudentID !== 'Select ID' &&
              <button className="btn btn-success" onClick={handleEditSave} >
                {editDate ? 'Save' : 'Edit'}
              </button>
            )
          }
        </div>

      </div>
    </div>
  );
}

export default MonthlyReport;