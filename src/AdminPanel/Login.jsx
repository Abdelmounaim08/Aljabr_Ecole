import React from 'react'
import Register from './Register'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import AuthUser from './Axios'
import { useState,useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../actions/AuthActions'


const Login = () => {
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate=useNavigate();
  const [Alert,setAlert]=useState(false);
  const {http}=AuthUser();
  const csrf=()=>axios.get("http://localhost:8000/sanctum/csrf-cookie");
  //await csrf();
  const handleFormSubmit = async (event) => {
    event.preventDefault();
  
    const credentials = {
      email: email,
      password: password
    };
  
    dispatch(login(credentials))
      .then((redirectUrl) => {
        navigate(redirectUrl);
      })
      .catch((error) => {
        // Handle login failure, e.g., display error message
        setAlert(true);
      });
  
    console.log(credentials);
  
    // Handle other operations after form submission
  };
    
  
 
  return (
    <>
      <div className="flex flex-col items-center justify-center md:flex-row gap-5">
      <div className='w-[40%]'>
         <img src='https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp'/>
      </div>
        <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
          </div>
          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
              <form className="space-y-6" action="#" method="POST" onSubmit={handleFormSubmit}>
              {Alert && (
                  <div className="text-red-500 text-sm">Failed to login. Please check your credentials and try again.</div>
                )}
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
                      onChange={(e)=>{setEmail(e.target.value)}}
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
                      autoComplete="current-password"
                      required
                      alue={password}
                      onChange={(e)=>{setPassword(e.target.value)}}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm">
                  <p>Don't have an account?<Link to='/Admin/register'><span className="font-medium text-indigo-600 hover:text-indigo-500"> Register</span></Link>
</p>
                  </div>
                </div>
                <div>
                  
                    <button   
                      type="submit"
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Sign in
                    </button>
                  
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login