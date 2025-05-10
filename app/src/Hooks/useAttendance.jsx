import axios from 'axios'
import { useEffect, useState } from 'react'

function useAttendance() {
    const [date, setDate] = useState('')
    const [data, setData] = useState([])
    const [error, setError] = useState('')
    const [attendance, setAttendance] = useState({})

    // Fetch student data
    useEffect(() => {
        axios.get('http://localhost:4001/StudentData')
            .then((response) => {
                setData(response.data)
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
            })
            .catch(error => {
                setError(error.message)
            })
    }, [])

  return { date, setDate, data, error, attendance, setAttendance }
}

export default useAttendance