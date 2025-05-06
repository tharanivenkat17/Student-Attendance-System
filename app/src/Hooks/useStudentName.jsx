import { useEffect, useState } from "react";

function useStudentName() {
    const [studentData, setStudentData] = useState([]);

    useEffect(() => {
      fetch('http://localhost:4001/StudentData')
        .then((res) => res.json())
        .then((data) => setStudentData(data))
        .catch((err) => console.error('Failed to fetch student data:', err));
    }, []);
  
    return { studentData };
}

export default useStudentName