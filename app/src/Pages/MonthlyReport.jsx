import React, { useEffect, useState } from 'react';
import '../Styles/MonthlyReport.css';
import axios from 'axios';

function MonthlyReport() {
  const [data, setData] = useState(0)
  const [date, setDate] = useState([])
  const [storedData, setStoredData] = useState()

  useEffect(() => {
    axios.get(`http://localhost:4001/attendance`)
      .then((response) => {
        setStoredData(response.data)
      })
  },[])

  function dateChange(event) {
    setData(event.target.value)
    const prefix = event.target.value;

    let temp = []

    sampleData.forEach((item, index) => {
      if (item.date.slice(0, 7) == prefix) {
        temp.push(item)
      }
    },[]);

    console.log(temp.length * 7);
  }

  function handleSubmit(event) {
    event.preventDefault()
    axios.get(`http://localhost:4001/attendance?date=${data}`)
      .then((response) => {
        setDate(response.data)
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        alert('An error occurred while fetching data.');
      });
  }

  return (
    <div className='background'>
      <h1>Monthly Report</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="month"
          value={data}
          name="data"
          onChange={(e) => dateChange(e)}
          required
        /> &nbsp;
      </form>
      <h2>Working Date of the {data} Month</h2>
      {date && (
        <ul>
          {date.map((workingDate, datum) => (
            <li key={datum}>{workingDate}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MonthlyReport;