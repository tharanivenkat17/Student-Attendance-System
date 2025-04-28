import axios from 'axios'
import { useState, useEffect, useMemo } from 'react'

function useAttendance() {
    const [data, setData] = useState([])
    const [error, setError] = useState('')
    const [attendance, setAttendance] = useState({})
    const StudentData = import.meta.env.VITE_StudentData

    // Fetch student data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${StudentData}`)
                setData(response.data)

                // const savedAttendance = localStorage.getItem('attendanceData');
                // if (savedAttendance) {
                //     setAttendance(JSON.parse(savedAttendance));
                // }
                // else {
                    // Initialize attendance after data is fetched
                    const initialAttendance = response.data.reduce((defaultValue, student) => {
                        defaultValue[student.studentId] = {
                            period1: false,
                            period2: false,
                            period3: false,
                            period4: false,
                            period5: false,
                            period6: false,
                            period7: false
                        };
                        return defaultValue;
                    }, {});
                    setAttendance(initialAttendance)
                }
            // }
            catch (error) {
                setError(error.message)
            }
        }
        fetchData();
    }, [])

    const memoizedAttendance = useMemo(() => attendance, [attendance])

    return { data, error, attendance: memoizedAttendance, setAttendance }
}

export default useAttendance
