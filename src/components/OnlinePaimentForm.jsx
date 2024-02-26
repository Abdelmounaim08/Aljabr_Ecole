import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { valid } from '../actions/AuthActions';
import axiosInstance from '../API/Axios';
const OnlinePaimentForm = ({ handleStudentData }) => {
  const [email, setEmail] = useState('');
  const [Massar, setCodeM] = useState('');
  const [Tel, setTel] = useState('');
  const [dateNaissance, setBirthday] = useState('');
  const [Message, setMessage] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleInfo = async (e) => {
    e.preventDefault();
    const eleve = { Massar: Massar, Tel:Tel, dateNaissance: dateNaissance, email: email };
    try {
      const response = await axiosInstance.post('/eleve/verification', eleve);
  
      const { message, eleve: studentData } = response.data;
  
      if (message === "Les informations de l'élève existent dans la base de données.") {
        dispatch(valid(studentData));
        navigate('/paiment-en-ligne/student');
        handleStudentData(studentData);
      } else {
        setMessage(message);
      }
    } catch (error) {
      console.error(error);
    }
  };
      
    //  setStudentData((prevStudentData) => ({ ...prevStudentData, ...eleve }));

    
    //console.log(eleve);   
    
    

  return (
      <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-24 w-auto"
            src="https://www.fatourati.ma/upload/logos/105302.jpg"
            alt="Workflow"
          />
          <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900">Ecole Al Jabr Junior</h2>
          <p className="mt-1 text-center text-sm text-gray-600">
            <span className="text-xl font-medium text-indigo-600 hover:text-indigo-500">
              Service de paiement en ligne
            </span>
          </p>
        </div>
        <div>{Message ?(<h3 className="block text-sm font-medium text-red-700 text-center">{Message}</h3>):null}</div>

        <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" action="#" method="POST" onSubmit={handleInfo}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="CodeMassar" className="block text-sm font-medium text-gray-700">
                  Code Massar
                </label>
                <div className="mt-1">
                  <input
                    id="Massar"
                    name="Massar"
                    type="Text"
                    onChange={(e) => setCodeM(e.target.value)}
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="CodeMassar" className="block text-sm font-medium text-gray-700">
                  Tel
                </label>
                <div className="mt-1">
                  <input
                    id="Tel"
                    name="Tel"
                    type="Text"
                    onChange={(e) => setTel(e.target.value)}
                    required
                    placeholder='+212...'
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="dtn" className="block text-sm font-medium text-gray-700">
                  Date de Naissance
                </label>
                <div className="mt-1">
                  <input
                    id="dateNaissance"
                    name="dateNaissance"
                    type="date"
                    onChange={(e) => setBirthday(e.target.value)}
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                    Remember me
                  </label>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Valider
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
  )
}

export default OnlinePaimentForm