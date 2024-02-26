import React from 'react'
import axiosInstance from '../API/Axios';
import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios'



const Add_Ecole = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImg] = useState('');
  
  const Navigate = useNavigate();
 
 

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDEScChange = (event) => {
    setDescription(event.target.value);
  };

  const handleIMGdChange = (e) => {
    console.log(e); // Check the event object
    setImg(e.target.files[0]);
  };

  const HandleSubmit = async (event) => {
    event.preventDefault();
  
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('image', image);
  
    try {
      await axios.post('http://127.0.0.1:8000/api/ecoles', formData); 
    
      // Clear form inputs on successful registration
      setName('');
      setDescription('');
      setImg(null);
    
      Navigate('/admin/profile');
    
      // Handle success, e.g., show a success message, redirect user, etc.
    } catch (e) {
      console.error(e);
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
      <div className='w-[40%]'>
        <img src='https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp' />
      </div>
      <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Register a new school</h2>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={HandleSubmit}>
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
                  description
                </label>
                <div className="mt-1">
                  <input
                    id="desc"
                    name="desc"
                    type="text"
                    autoComplete="email"
                    required
                    value={description}
                    onChange={(e) => { setDescription(e.target.value) }}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                 image
                </label>
                <div className="mt-1">
                <input
  id="image"
  name="image"
  type="file"
  onChange={(e) => handleIMGdChange(e)}
  autoComplete="current-password"
  required
  className="appearance-none block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
/>
                </div>
              </div>
              <div>
                
              
                
                <div className='mt-12'>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Add
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

export default Add_Ecole