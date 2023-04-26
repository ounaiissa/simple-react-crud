import  {React, useEffect, useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Student() {
  // to display
  const [student, setStudent] = useState([]);
  // to fetch
  useEffect(()=>{
    axios.get('http://localhost:8082/')
    .then(res => setStudent(res.data))
    .catch(err => console.log(err));
  }, [])


  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8082/student/${id}`);
      setStudent(student.filter(data => data.id !== id));
    } catch (err) {
      console.log(err);
    }
  };
  
  return (
    <div className="d-flex bg-light justify-content-center align-items-center" style={{ height: '100vh' }}>
      <div className='w-50 bg-white rounded p-3'>
        <div className='d-flex justify-content-start'>
        <Link to="/create" className=' btn btn-success my-3'> + Add </Link>
        </div>
    
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {student && student.length > 0 ? (
              student.map((data, i) => (
                <tr key={i}>
                  <td>{data.name}</td>
                  <td>{data.email}</td>
                  <td>
                    <Link to={`update/${data.id}`} className='btn btn-primary mx-1'>Update</Link>
                    <button className='btn btn-danger mx-1' onClick={ e => handleDelete(data.id)}>Delete</button>
                    {/* <Link to={`delete/${data.id}`} className='btn btn-danger mx-1'>Delete</Link> */}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2">No data found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Student;
