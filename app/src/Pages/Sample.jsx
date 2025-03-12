// import axios from 'axios';
// import React, { useState } from 'react';

// function Sample() {
//   const [data, setData] = useState(0);
//   const [result, setResult] = useState([]);

//   function handleChange(event) {
//     setData(event.target.value);
//   }

//   function handleSubmit(event) {
//     event.preventDefault();
//     axios.get(`http://localhost:4001/attendance?studentId=${data}`)
//       .then((response) => {
//         if (!response.data || response.data.length === 0) {
//           alert('There is no student with this Student Id, Please enter a valid student id');
//         } else {
//           console.log(response.data)
//           setResult(response.data);
//         }
//       })
//       .catch((error) => {
//         console.error('Error fetching data:', error);
//         alert('An error occurred while fetching data.');
//       });
//   }

//   return (
//     <div>
//       <h1>Sample</h1>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="number"
//           placeholder='Enter Student Id'
//           value={data}
//           name="data"
//           onChange={handleChange}
//           required
//         />
//         <button type='submit'>Submit</button>
//       </form>

//       <table border={2} style={{ borderCollapse: "collapse" }}>
//         <thead>
//           <tr>
//             <td>Student Id</td>
//             <td>Date</td>
//             <td>Period 1</td>
//             <td>Period 2</td>
//             <td>Period 3</td>
//             <td>Period 4</td>
//             <td>Period 5</td>
//             <td>Period 6</td>
//             <td>Period 7</td>
//           </tr>
//         </thead>
//         <tbody>
//           {result.map((datum) => (
//             <tr key={datum.studentId}>
//               <td>{data}</td>
//               <td>{datum.date}</td> 
//               <td>{data.period1}</td>
//               <td>{data.period2}</td>
//               <td>{data.period3}</td>
//               <td>{data.period4}</td>
//               <td>{data.period5}</td>
//               <td>{data.period6}</td>
//               <td>{data.period7}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default Sample;

import axios from 'axios';
import React, { useState } from 'react';

function Sample() {
  const [data, setData] = useState('');
  const [result, setResult] = useState([]); 

  function handleChange(event) {
    setData(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    axios.get(`http://localhost:4001/attendance?studentId=${data}`)
      .then((response) => {
        if (!response.data || response.data.length === 0) {
          alert('There is no student with this Student Id, Please enter a valid student id');
        } else {
          setResult(response.data);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        alert('An error occurred while fetching data.');
      });
  }

  return (
    <div>
      <h1>Sample</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Enter Student Id"
          value={data}
          name="data"
          onChange={handleChange}
          required
        />
        <button type="submit">Submit</button>
      </form>

      <table border={2} style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Student Id</th>
            <th>Date</th>
            <th>Period 1</th>
            <th>Period 2</th>
            <th>Period 3</th>
            <th>Period 4</th>
            <th>Period 5</th>
            <th>Period 6</th>
            <th>Period 7</th>
          </tr>
        </thead>
        <tbody>
          {result.map((datum) => (
            datum.student[data] && (
              <tr key={datum.date}>
                <td>{data}</td>
                <td>{datum.date}</td>
                <td>{datum.student[data].period1}</td>
                <td>{datum.student[data].period2}</td>
                <td>{datum.student[data].period3}</td>
                <td>{datum.student[data].period4}</td>
                <td>{datum.student[data].period5}</td>
                <td>{datum.student[data].period6}</td>
                <td>{datum.student[data].period7}</td>
              </tr>
            )
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Sample;
