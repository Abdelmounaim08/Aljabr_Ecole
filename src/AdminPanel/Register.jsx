import React from 'react'
import axiosInstance from '../API/Axios';

import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { useEffect } from 'react';


const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [id_ecole, setIDecole] = useState(1);
  const [Ecole, setEcoles] = useState([]);
  const [role, setrole] = useState("");
  const Navigate = useNavigate();
  useEffect(() => {
    axiosInstance.get('/ecoles')
      .then(response => {
        setEcoles(response.data);
        console.log(Ecole.id);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
 

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleIdEcoleChange = (event) => {
    setIDecole(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newUser = {
      name: name,
      email: email,
      password: password,
      id_ecole: id_ecole,
      role:role,
    };

    try {
      // Make a POST request to your API endpoint
      await axios.post('http://127.0.0.1:8000/api/register', newUser);

      // Clear form inputs on successful registration
      setName('');
      setEmail('');
      setPassword('');
      setIDecole(null);
      setrole('');
      Navigate('/admin');

      // Handle success, e.g., show a success message, redirect user, etc.
    } catch (error) {
      console.error(error);
      console.log(newUser);
      // Handle error, e.g., show an error message, etc.
    }

  };

  /* const Register = async(e)=>{
       e.preventDefault();
       const formData = new FormData();
       formData.append('name', name)
       formData.append('email', email)
       formData.append('password', password)

       console.log(formData)
       await axios.post('http://127.0.0.1:8000/admin/register', formData)
       .then(({data})=>{
           console.log(data.message)
           navigate('/')
       }).catch(({response})=>{
           if (response.status ==422) {
               console.log(response.data.errors)
           } else {
               console.log(response.data.message)
           }
       })
   }*/

  return (
    <div className="flex flex-col items-center justify-center md:flex-row gap-5">
      <div className="w-[70%] pb-[20%] mr-20 pl-[10%] sm:pl-5">
      <img src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" />
    </div>
    <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Register a new account</h2>
      </div>
      <div className="mt-6 w-full h-100 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white w-full py-18 px-4 shadow sm:rounded-lg sm:px-10">
      
            <form className="space-y-3" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => { setName(e.target.value) }}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => { setEmail(e.target.value) }}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value) }}
                    autoComplete="current-password"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Ecole
                </label>
                <div className="mt-1">
                  <select
                    onChange={(e) => {setIDecole(e.target.value) }}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >{Ecole.map(Ecole => (
                    <option  key={Ecole.id} value={Ecole.id} >{Ecole.name}</option>
                   
                  ))}
                  
                    
                  </select>
                </div>
                <div className="mt-1">
                  <select
                    onChange={(e) => {setrole(e.target.value) }}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option value="superAdmin" >superAdmin</option>
                    <option value="Admin" >Admin</option>
                   
                
                  
                    
                  </select>
                </div>
                <div />
                <div className='mt-12'>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Sign Up
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
   
  )
}

export default Register