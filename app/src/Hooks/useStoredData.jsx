import React, { useEffect, useState } from 'react';
import axios from 'axios';

function useStoredData() { 
  const [storedData, setStoredData] = useState([]); 

  useEffect(() => {
    axios.get('http://localhost:4001/attendance')
      .then((response) => {
        setStoredData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        alert('An error occurred while fetching data.');
      });
  }, []);

  return { storedData }
}
export default useStoredData