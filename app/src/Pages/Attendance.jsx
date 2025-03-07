import React from 'react'

function Attendance() {
  const [data, setData] = useState([])
  const [userData, setUserData] = useState([])
  const [error, setError] = useState('')
  useEffect(() => {
    axios.get(`http://localhost:5500/Data`)
      .then(response => {
        setData(response.data) //  setData function - storing the fetched data in the component's state
      })
      .catch(error => {
        setError(error.message) //  setError - error message to store it in the component's state
      })

    axios.get(`http://localhost:5500/UserData`)
      .then(response => {
        setUserData(response.userData) //  setData function - storing the fetched data in the component's state
      })
      .catch(error => {
        setError(error.message) //  setError - error message to store it in the component's state
      })
  }, [])
  return (
    <div>
      <table>
        <thead>
          <tr>10 - A (Attendance Sheet) </tr>
          <tr>
            <td>Name</td>
            <td>Period 1</td>
            <td>Period 2</td>
            <td>Period 3</td>
            <td>Period 4</td>
            <td>Period 5</td>
            <td>Period 6</td>
            <td>Period 7</td>
          </tr>
        </thead>
        <tbody>
          {data && data.map((datum) => (
            <tr key={datum.id}>
              <td>{datum.name}</td>
              <td>{datum.period1}</td>
              <td>{datum.period2}</td>
              <td>{datum.period}</td>
              <td>{datum.period1}</td>
              <td>{datum.period1}</td>
              <td>{datum.period1}</td>
              <td>{datum.period1}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Attendance