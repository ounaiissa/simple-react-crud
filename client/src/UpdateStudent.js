import { React, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function UpdateStudent() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const {id} = useParams();
    const navigate = useNavigate();
    function handleSubmit(event){
      event.preventDefault();
      axios.put('http://localhost:8082/update/' +id ,{name, email})
      .then(res =>{
        console.log(res);
        navigate('/');
      }).catch(err => console.log(err));
    }
  return (
    <div className='m-4' style={{ width: 400 }}>
    <h2>Update student</h2>
    <form onSubmit={handleSubmit}>
    <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text" id="basic-addon1">@</span>
        </div>
        <input type="text" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" 
        onChange={e => setName(e.target.value)}
        />
      </div>
      <div className="input-group mb-3">
      <div className="input-group-append">
          <span className="input-group-text" id="basic-addon2">@example.com</span>
        </div>
        <input type="text" className="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="basic-addon2" 
        onChange={e => setEmail(e.target.value)}
        />
       
      </div>
      <button onClick={handleSubmit} className='btn btn-primary mx-1'>Update</button>
     
    </form>
      
    </div>
  );
}

export default UpdateStudent;
