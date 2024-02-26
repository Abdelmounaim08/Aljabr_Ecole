
import React, { useState } from "react";
import axiosInstance from '../API/Axios';
import axios from 'axios'
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
useNavigate
const AddEleve = () => {
  const [fullName, setFullName] = useState("");
  const [prenom, setPrenom] = useState("");
  const [CIN, setCIN] = useState("");
  const [CNE, setCNE] = useState("");
  const [dateNaissance, setDateNaissance] = useState("");
  const [email, setEmail] = useState("");
  const [classe, setClasse] = useState([]);
  const [idEcole, setIdEcole] = useState();
  const [Idniveau, setIdniveau] = useState();
  const [Idclase, setIdclase] = useState();
  const [Tel, setTel] = useState('');
  const [montant, setmontant] = useState('');
  const [niveau, setNiveau] = useState([]);
  const [ecole, setecole] = useState([]);
  const id = useSelector((state) => state.auth.user.user.id_ecole);
  const InfUser = useSelector(state => state.auth.user);
  const role = InfUser.user.role;
  const Navigate = useNavigate();
  //////////////////
  useEffect(()=>{
    axiosInstance
    .get('/classe')
    .then((response) => {
    setClasse(response.data);
   // console.log(response.data)
      
      //console.log(niveau);
    })
    .catch((error) => {
      console.error(error);
    });
  },[]);
  ///////////////////
  useEffect(()=>{
    axiosInstance
    .get('/niveau')
    .then((response) => {
    setNiveau(response.data);
      
      //console.log(niveau);
    })
    .catch((error) => {
      console.error(error);
    });
  },[]);
  /////////////////////
  useEffect(()=>{
    axiosInstance
    .get('/ecoles')
    .then((response) => {
        setecole(response.data);
      
     // console.log(niveau);
    })
    .catch((error) => {
      //console.error(error);
    });
  },[]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('name', fullName);
    formData.append('prenom', prenom);
    formData.append('CIN', CIN);
    formData.append('CNE', CNE);
    formData.append('dateNaissance', dateNaissance);
    formData.append('email', email);
    formData.append('Tel', Tel);
    formData.append('montant', montant);
    formData.append('class_id', Idclase);
    if (role === "superAdmin") {
      formData.append('id_ecole', idEcole);
     
    } else {
      formData.append('id_ecole', id);
    }
    formData.append('niveau_id', Idniveau);
  
    try {
      await axios.post('http://127.0.0.1:8000/api/eleve/add', formData);
  
      // Clear form inputs on successful registration
      setFullName('');
      setPrenom('');
      setCIN('');
      setCNE('');
      setDateNaissance('');
      setEmail('');
      setClasse('');
      setIdEcole('');
      setNiveau('');
  
      // Handle success, e.g., show a success message, redirect user, etc.
      //console.log('Insertion successful');
      
      Navigate('/admin/profile');
    } catch (error) {
      console.error(error.response.data);
      // Handle error, e.g., show an error message, etc.
    }
  }
  return (
    <div className="flex flex-col items-center justify-center md:flex-row gap-8">
 
 <div className="justify-center space-y-8 py-22 items-center w-full h-full">
  <h2 className="pb-22 mt-8 text-center text-3xl ml-12 font-extrabold text-gray-900">
    {ecole.find((school) => school.id === id)?.name}
  </h2>
  <div className="w-[90%] pb-[10%]  pl-12  ml-12 text-center sm:pl-5 md:pb-[40%]">
    {ecole.find((school) => school.id === id)?.image !== null ? (
      <img
        src={ecole.find((school) => school.id === id)?.image}
        alt="Image"
      />
    ) : (
      <div className="w-[70%] pb-[20%] mr-20 pl-[10%] sm:pl-5">
        <img
          src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
          alt="Image"
        />
      </div>
    )}
  </div>
</div>
  
    <div className="w-full h-90 md:w-600 flex flex-col mb-22 pb-5 justify-center py-12 sm:px-6 lg:px-8">
      <h2 className="mt-1 text-center text-3xl font-extrabold text-gray-900">
        Register a new student
      </h2>
  
      <div className="mt-6 w-full h-100 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white w-full py-18 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-2 " onSubmit={handleSubmit}>
              
                
               
                <label className="block text-sm font-medium text-gray-700">
                 Nom
                </label>
                  <input
                    type="text"
                    name="fullName"
                    id="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    autoComplete="off"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                   <label className="block text-sm font-medium text-gray-700">
                  Prénom
                </label>
                  <input
                    type="text"
                    name="prenom"
                    id="prenom"
                    value={prenom}
                    onChange={(e) => setPrenom(e.target.value)}
                    autoComplete="off"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
             
             


                
                
                <label className="block text-sm font-medium text-gray-700">
                  CIN
                </label>
                  <input
                    type="text"
                    name="CIN"
                    id="CIN"
                    value={CIN}
                    onChange={(e) => setCIN(e.target.value)}
                    autoComplete="off"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                     <label className="block text-sm font-medium text-gray-700">
                  Massar
                </label>
               
                  <input
                    type="text"
                    name="CNE"
                    id="CNE"
                    value={CNE}
                    onChange={(e) => setCNE(e.target.value)}
                    autoComplete="off"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
               
             

              <div>
             
                
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Date de Naissance
                </label>
                <div className="mt-1">
                  <input
                    type="date"
                    name="dateNaissance"
                    id="dateNaissance"
                    value={dateNaissance}
                    onChange={(e) => setDateNaissance(e.target.value)}
                    autoComplete="off"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <div className="mt-1">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="off"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Classe
                </label>
                <select  name="id_ecole" id="id_ecole"  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        onChange={(e) => setIdclase(e.target.value)}>
    {classe.map((e, i) => (
        <option key={i} value={e.id}>{e.name}</option>
    ))}
</select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Tel
                </label>
                <div className="mt-1">
                  <input
                    type="Text"
                    name="Tel"
                    id="Tel"
                    value={Tel}
                    onChange={(e) => setTel(e.target.value)}
                    autoComplete="off"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  montant
                </label>
                <div className="mt-1">
                  <input
                    type="float"
                    name="montant"
                    id="montant"
                    value={montant}
                    onChange={(e) => setmontant(e.target.value)}
                    autoComplete="off"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>


              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Niveau
                </label>
                <div className="mt-1">
                <select name="Niveau" id="Niveau" className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
         onChange={(e) => setIdniveau(e.target.value)}>
    {niveau.map((e, i) => (
        <option key={i} value={e.id}>{e.name}</option>
    ))}
</select>
                </div>
               
              </div>
              <div>
              <label className="block text-sm font-medium text-gray-700">
                  Ecole
                </label>
                {role === "superAdmin" && (
                    <div className="mt-1">
                    <select name="Niveau" id="Niveau" className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
             onChange={(e) => setIdEcole(e.target.value)}>
        {ecole.map((e, i) => (
            <option key={i} value={e.id}>{e.name}</option>
        ))}
    </select>
                    </div>)}
                    </div>
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEleve;
