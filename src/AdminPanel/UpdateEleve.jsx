import { useState } from "react"
import {  useParams } from "react-router-dom";
import { useEffect } from "react";
import axiosInstance from '../API/Axios';
import { useNavigate } from "react-router-dom";
export const UpdateEleves=()=>{
   const [student, setStudent] = useState({});
    const [formData, setFormData] = useState({});
    const [classe, setClasse] = useState([]);
    const [niveau, setNiveau] = useState([]);
    const [ecole, setecole] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams(); 
  const Navigate = useNavigate();
  // Récupérer l'ID de l'élève depuis les paramètres d'URL
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
  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await axiosInstance.get(`/eleve/${id}`);
        setStudent(response.data);
        setFormData({
          name: response.data.name,
          prenom: response.data.prenom,
          email: response.data.email,
          CNE: response.data.CNE,
          CIN: response.data.CIN,
          dateNaissance: response.data.class_id,
          class_id: response.data.class_id,
          niveau_id: response.data.niveau_id,
          id_ecole: response.data.id_ecole,
          Tel:response.data.Tel,
          montant:response.data.montant
        });
        console.log(response.data)
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching student:', error);
        setIsLoading(false);
      }
    };

    fetchStudent();
  }, [id]);
 
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
  
    try {
      await   axiosInstance
        .put(`/eleve/${id}`, formData);

      // Clear form inputs on successful registration
   
      // Handle success, e.g., show a success message, redirect user, etc.
      console.log('Insertion successful');
      
      Navigate('/admin/students');
    } catch (error) {
      console.error(error.response.data);
      // Handle error, e.g., show an error message, etc.
    }
  }
return(
<>
      {isLoading ? (
        <div className="text-center font-xs ">Loading...</div>
      ) : 
      (
  <div className="flex flex-col  items-center justify-center md:flex-row gap-5">
       
       <div className="w-[25%] mr-32 mb-60">
       
         <img src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" />
       </div>
       <div className="  w-500 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
       <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Update student
           </h2>
       
         <div className="mt-8  w-[100%] h-100 sm:mx-auto sm:w-full sm:max-w-md">
           <div className="bg-white w-[100%] py-8 px-4 shadow sm:rounded-lg sm:px-10">
             <form className="space-y-6" onSubmit={handleSubmit}>
               <div >
                 
                 <div className="mt-1 flex space-x-6">
                 <label className="block text-sm font-medium text-gray-700">
                   Full Name
                 </label>
                   <input
                     type="text"
                     name="name"
                     id="name"
                     value={formData.name}
                     onChange={handleChange}
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
                     value={formData.prenom}
            onChange={handleChange}
                     autoComplete="off"
                     required
                     className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                   />
                 </div>
               </div>

 
               <div>
                 <label className="block text-sm font-medium text-gray-700">
                   CIN
                 </label>
                 <div className="mt-1 flex">
                   <input
                     type="text"
                     name="CIN"
                     id="CIN"
                     value={formData.CIN}
                     onChange={handleChange}
                     
                     
                     className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                   />
                      <label className="block text-sm font-medium text-gray-700">
                   CNE
                 </label>
                
                   <input
                     type="text"
                     name="CNE"
                     id="CNE"
                     value={formData.CNE}
                     onChange={handleChange}
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
                     value={formData.email}
                     onChange={handleChange}
                     autoComplete="off"
                     required
                     className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                   />
                 </div>
               </div>
               <div>
                 <label className="block text-sm font-medium text-gray-700">
                   Tel
                 </label>
                 <div className="mt-1">
                   <input
                     type="text"
                     name="Tel"
                     id="Tel"
                     value={formData.Tel}
                     onChange={handleChange}
                     autoComplete="off"
                     required
                     className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                   />
                 </div>
               </div>
               <div>
                 <label className="block text-sm font-medium text-gray-700">
                   Montant
                 </label>
                 <div className="mt-1">
                   <input
                     type="float"
                     name="montant"
                     id="montant"
                     value={formData.montant}
                     onChange={handleChange}
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
                 <select  name="class_id" id="class_id"  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        value={formData.class_id}
        onChange={handleChange}>
     {classe.map((e, i) => (
         <option key={i} value={e.id}>{e.name}</option>
     ))}
 </select>
               </div>
 
               <div>
                 <label className="block text-sm font-medium text-gray-700">
                   ID École
                 </label>
                 <div className="mt-1">
                 <select
  name="id_ecole"
  id="id_ecole"
  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
  value={formData.id_ecole}
  onChange={handleChange}
>
  {ecole.map((e, i) => (
    <option key={i} value={e.id}>
      {e.name}
    </option>
  ))}
</select>
                 </div>
               </div>
 
               <div>
                 <label className="block text-sm font-medium text-gray-700">
                   Niveau
                 </label>
                 <div className="mt-1">
                 <select name="niveau_id" id="niveau_id" className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        value={formData.niveau_id}
        onChange={handleChange}>
     {niveau.map((e, i) => (
         <option key={i} value={e.id}>{e.name}</option>
     ))}
 </select>
                 </div>
               </div>
 
               <div>
                 <button
                   type="submit"
                   className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                 >
                Update
                 </button>
               </div>
             </form>
           </div>
         </div>
       </div>
     </div>)}
</>)
}
