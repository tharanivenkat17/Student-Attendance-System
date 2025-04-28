import React, { useState } from 'react'
import { useAttendanceContext } from './AttendanceContext';

function useEditSave() {
    const AttendanceData = import.meta.env.VITE_Attendance
    const { updateMonthlyReport } = useAttendanceContext();

    const [editedData, setEditedData] = useState({});

    // save and edit 
    const saveEditedAttendance = async (date, editedStudents) => {
        try {
            const res = await fetch(`${AttendanceData}?date=${date}`);
            const existing = await res.json();

            const updatedStudentData = {};
            editedStudents.forEach(({ studentId, ...periods }) => {
                updatedStudentData[studentId] = periods;
            });

            if (existing.length > 0) {
                const record = existing[0];
                await fetch(`${AttendanceData}/${record.id}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ student: updatedStudentData })
                });
                console.log(`Updated attendance for ${date}`);
            }

            updateMonthlyReport(selectedMonth);
            // window.location.reload();
        } catch (err) {
            console.error('Error saving attendance:', err);
        }
    };

    return { editedData, setEditedData, saveEditedAttendance }
}

export default useEditSave