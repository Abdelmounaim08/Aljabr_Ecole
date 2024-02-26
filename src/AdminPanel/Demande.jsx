import React from 'react'
import axiosInstance from '../API/Axios';

import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { useEffect } from 'react';


const Demande = () => {
    const [name, setName] = useState('');
 
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [adress, setAdress] = useState('');
  const [mail, setMail] = useState('');
  const [contact, setContact] = useState('');
  const [sitweb, setSitweb] = useState('');
  const [reseaux, setReseaux] = useState('');
  const [nameAdmin, setNameAdmin] = useState('');
  const [emailAdmin, setEmailAdmin] = useState('');
  const [password, setPassword] = useState('');

  const Navigate = useNavigate();
  
  const handleImageChange = (e) => {
    console.log(e); // Check the event object
    setImage(e.target.files[0]);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const formData = new FormData(); // Utiliser FormData pour envoyer l'image

  formData.append('name', name);
  formData.append('description', description);
  formData.append('image', image); // Utiliser directement l'objet image

  // Ajouter les autres propriétés de newUser à formData
  formData.append('adress', adress);
  formData.append('mail', mail);
  formData.append('contact', contact);
  formData.append('sitweb', sitweb);
  formData.append('reseaux', reseaux);
  formData.append('nameAdmin', nameAdmin);
  formData.append('emailAdmin', emailAdmin);
  formData.append('password', password);
  
    try {
      // Make a POST request to your API endpoint
      await axiosInstance.post('/register-request', formData );
  
      // Clear form inputs on successful registration
      setName('');
      setPassword('');
      setDescription('');
      setImage(null);
      setAdress('');
      setMail('');
      setContact('');
      setSitweb('');
      setReseaux('');
      setNameAdmin('');
      setEmailAdmin('');
      Navigate('/admin');
  
      // Handle success, e.g., show a success message, redirect user, etc.
    } catch (error) {
      console.error(error);
  
      // Handle error, e.g., show an error message, etc.
    }
  };
  

  return (
    <div class="flex flex-col items-center justify-center md:flex-row gap-5">
    <div class="w-[45%] pl-12 ml-12 ">
      <img src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" />
    </div>
    <div class="min-h-full flex flex-col mr-2 w-[70%] justify-center py-12 sm:px-6 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">request a new account</h2>
      </div>
      <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form class="space-y-6 space-x-4 " onSubmit={handleSubmit}>
          <div class="grid grid-cols-2 gap-5 ">
            <div>
              <label class="block text-sm font-medium text-gray-700"> Nom de l'Ecole</label>
              <div class="mt-1">
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => { setName(e.target.value) }}
                  class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              
            </div>
           
            <div>
              <label class="block text-sm font-medium text-gray-700">Description</label>
              <div class="mt-1">
                <input
                  type="text"
                  required
                  value={description}
                  onChange={(e) => { setDescription(e.target.value) }}
                  class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
  <label class="block text-sm font-medium text-gray-700">Image</label>
  <div className="mt-1 relative">
  <label className="relative flex items-center justify-center bg-white rounded-md overflow-hidden border border-gray-300 cursor-pointer hover:border-indigo-500 focus-within:border-indigo-500">
 
  <span className="pl-3 pr-4 py-2 text-gray-700">Choisir un fichier</span>
  <input type="file" className="absolute inset-0 opacity-0 w-full h-full cursor-pointer" onChange={(e) => { handleImageChange(e) }} />
</label>
</div>
</div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Address</label>
              <div class="mt-1">
                <input
                  type="text"
                  required
                  value={adress}
                  onChange={(e) => { setAdress(e.target.value) }}
                  class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Mail</label>
              <div class="mt-1">
                <input
                  type="email"
                  required
                  value={mail}
                  onChange={(e) => { setMail(e.target.value) }}
                  class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Contact</label>
              <div class="mt-1">
                <input
                  type="text"
                  required
                 value={contact}
                  onChange={(e) => { setContact(e.target.value) }}
                  class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Website</label>
              <div class="mt-1">
                <input
                  type="text"
                  required
                  value={sitweb}
                  onChange={(e) => { setSitweb(e.target.value) }}
                  class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Social Media</label>
              <div class="mt-1">
                <input
                  type="text"
                  required
                  value={reseaux}
                  onChange={(e) => { setReseaux(e.target.value) }}
                  class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700"> Nom de Admin </label>
              <div class="mt-1">
                <input
                  type="text"
                  required
                  value={nameAdmin}
                  onChange={(e) => { setNameAdmin(e.target.value) }}
                  class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label for="emailAdmin" class="block text-sm font-medium text-gray-700"> Email de Admin </label>
              <div class="mt-1">
                <input
                  id="emailAdmin"
                  name="emailAdmin"
                  type="email"
                  autoComplete="email"
                  required
                  value={emailAdmin}
                  onChange={(e) => { setEmailAdmin(e.target.value) }}
                  class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label for="password" class="block text-sm font-medium text-gray-700">Mots de passe</label>
              <div class="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => { setPassword(e.target.value) }}
                  class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <div />
             
            </div>
            </div>
            <div class="mt-12">
                <button  
                  type="submit"
                  class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Sign Up
                </button>
              </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  
  )
}

export default Demande