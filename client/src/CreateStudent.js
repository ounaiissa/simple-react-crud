import { React, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function CreateStudent() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    function handleSubmit(event){
      event.preventDefault();
      axios.post('http://localhost:8082/create',{name, email})
      .then(res =>{
        console.log(res);
        navigate('/create');
      }).catch(err => console.log(err));
    }
  return (
    <div className='m-4' style={{ width: 400 }}>
    <h2>Add student</h2>
    <form onSubmit={handleSubmit} method="POST" action="http://localhost:8082/create">
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
      <button onClick={handleSubmit} className='btn btn-primary mx-1'>Submit</button>
     
    </form>
      
    </div>
  );
}

export default CreateStudent;
