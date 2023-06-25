import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function AddUser() {

    let navigate = useNavigate();

    const [user, setUser] = useState({
        username:"",
        firstName:"",
        lastName:"",
        email:"",
    });
    const {username, firstName, lastName, email} = user;

    const onInputChange = (e) => {
        setUser({...user, [e.target.name]:e.target.value});
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:8080/user", user);
        navigate("/");
    };

  return (
    <div className='container'>
        <div className='row'>
            <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                <h2 className='text-center m-4'>Register User</h2>
                <form onSubmit={(e) => onSubmit(e)}>
                <div className='mb-3'>
                    <label htmlFor='Username' className='form-label'>
                        Username
                    </label>
                    <input type='text' 
                        className='form-control' 
                        placeholder='Enter username' 
                        name = "username" 
                        value={username}
                        onChange={(e) => onInputChange(e)}
                        />
                        
                </div>
                <div className='mb-3'>
                    <label htmlFor='FirstName' className='form-label'>
                        FirstName
                    </label>
                    <input type='text'
                         className='form-control' 
                         placeholder='Enter your fistname' 
                         name = "firstName" 
                         value={firstName} 
                         onChange={(e) => onInputChange(e)}
                         />
                </div>
                <div className='mb-3'>
                    <label htmlFor='LastName' className='form-label'>
                        LastName
                    </label>
                    <input type='text' 
                        className='form-control' 
                        placeholder='Enter your lastname' 
                        name = "lastName" 
                        value={lastName} onChange={(e) => onInputChange(e)}
                        />
                </div>
                <div className='mb-3'>
                    <label htmlFor='Email' className='form-label'>
                        E-mail
                    </label>
                    <input type='email' 
                        className='form-control' 
                        placeholder='Enter your email' 
                        name = "email" 
                        value={email}
                        onChange={(e) => onInputChange(e)}
                        />
                </div>
                <button type='submit' className='btn btn-outline-primary'>Create</button>
                <Link to={"/"} className='btn btn-outline-danger mx-2'>Cancel</Link>
                </form>
            </div>
        </div>
    </div>
  )
}
