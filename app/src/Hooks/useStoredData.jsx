import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';

function useStoredData() { 
  const [storedData, setStoredData] = useState([]); 
  const AttendanceData = import.meta.env.VITE_Attendance

  useEffect(() => {

    const fetchData = async () => {
      try{
        const response = await axios.get(`${AttendanceData}`)
        setStoredData(response.data);
      }
      catch(error) {
        console.error('Error fetching data:', error);
        alert('An error occurred while fetching data.');
      }
    }
    fetchData();
  }, []);

  const memoizedStoredData = useMemo(() => storedData, [storedData])

  return { storedData:memoizedStoredData }
}
export default useStoredData