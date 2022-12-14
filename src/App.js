import './App.css';
import { useState } from "react";
import Axios from "axios";

function App() {
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState('');
  const [position, setPosition] = useState('');
  const [wage, setWage] = useState(0);

  const [ employeeList, setEmployeeList] = useState([]);

  const addEmployee = () => {
    Axios.post('http://localhost:3001/create', {
      name: name,
      age: age,
      country: country,
      position: position,
      wage: wage
    }).then(() => {
      setEmployeeList([...employeeList, 
        {
        name: name,
        age: age,
        country: country,
        position: position,
        wage: wage
      }])
    });
  }

  const getEmployees = () => {
        Axios.get('http://localhost:3001/employees').then((response) => {
      setEmployeeList(response.data)
    });
  }

  const deleteEmployees = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      setEmployeeList(employeeList.filter((val) => {
        return val.id != id;
      }))
    })
  }

  return (
    <div className="App">

      <h1>Data Base Employee</h1>

      <div className='boxes'>

        <div className="information">
          <h2>Add employee:</h2>
          <label>Name:</label>
          <input 
            type="text" 
            onChange={(event) => {
              setName(event.target.value);
            }}/>
          <label>Age:</label>
          <input 
            type="number"
            onChange={(event) => {
              setAge(event.target.value);
            }}/>
          <label>Country:</label>
          <input 
            type="text"
            onChange={(event) => {
              setCountry(event.target.value);
            }}/>
          <label>Position:</label>
          <input 
            type="text"
            onChange={(event) => {
              setPosition(event.target.value);
            }}/>
          <label>Wage (year):</label>
          <input 
            type="number"
            onChange={(event) => {
              setWage(event.target.value);
            }}/>
          <button className="addEmploy" onClick={addEmployee}>Add employee</button>
        </div>

        <div className='employees'>
          <h2>Show Employees</h2>
          <button onClick={getEmployees}>Show Employees</button>
            
            <table>
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Age</th>
                  <th scope="col">Country</th>
                  <th scope="col">Position</th>
                  <th scope="col">Wage</th>
                  <th scope="col"></th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                    {employeeList.map((val, key) => {
                  return (
                      <tr>
                        <td>{val.name}</td>
                        <td>{val.age}</td>
                        <td>{val.country}</td>
                        <td>{val.position}</td>
                        <td>{val.wage}</td>
                        <td><button>Edit</button></td>
                        <td><button onClick={() => {deleteEmployees(val.id)}}>Delete</button></td>
                      </tr>
                    )
                })}
              </tbody>
            </table>


        </div>
      </div>
    </div>
  );
}

export default App;
