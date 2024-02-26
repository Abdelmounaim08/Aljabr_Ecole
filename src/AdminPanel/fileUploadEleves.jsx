import React, { useState } from 'react';
import axios from 'axios';
import { parse, format } from 'date-fns';
import axiosInstance from '../API/Axios';
import { useSelector } from 'react-redux';
import AdminLayout from './AdminLayout';
import * as XLSX from 'xlsx';
import { useNavigate } from "react-router-dom";
import {  useEffect } from 'react';
const FileUploadEleves= () => {
  const [file, setFile] = useState(null);
  const idEcole = useSelector((state) => state.auth.user.user.id_ecole);
  const InfUser = useSelector(state => state.auth.user);
  const role = InfUser.user.role;
  
  const [jsonData, setJsonData] = useState(null);
  const [result, setRes] = useState(null);
  const [classes, setClasses] = useState([]);
  const [niveaux, setNiveau] = useState([]);
  const [idNv, setidNv] = useState([]);
  const [idcls, setidcls] = useState([]);

  const Navigate = useNavigate();
  const handleFile = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
  
    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: 'binary' });
  
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
  
      const jsonData = XLSX.utils.sheet_to_json(sheet, {
        header: 1,
        cellDates: true,
        dateNF: 'dd/mm/yyyy',
      });
  
      //console.log('jsonData:', jsonData); // Affiche les données brutes extraites de la feuille Excel
  
      const headers = jsonData[0];
      const dataRows = jsonData.slice(1);
  
      const result = dataRows.map((row) => {
        const obj = {};
        headers.forEach((header, index) => {
          if (header === 'dateNaissance') {
            const rawDateValue = row[index];
            console.log('rawDateValue:', rawDateValue); // Affiche la valeur brute de la date
  
            if (typeof rawDateValue === 'number' && !isNaN(rawDateValue)) {
              const rawDate = XLSX.SSF.format('dd/mm/yyyy', rawDateValue);
              console.log('rawDate:', rawDate); // Affiche la date convertie au format texte
  
              const date = parse(rawDate, 'dd/MM/yyyy', new Date());
              console.log('parsedDate:', date); // Affiche la date analysée 
  
              if (isValid(date)) {
                obj[header] = format(date, 'yyyy-MM-dd');
              } else {
                obj[header] = null;
              }
            } else {
              obj[header] = null;
            }
          } else {
            obj[header] = row[index];
          }
        });
        return obj;
      });
  
      console.log('result:', result); 
  
      setRes(result);
    };
  
    reader.readAsBinaryString(file);
  };

  const isValid = (date) => {
    return !isNaN(date.getTime());
  };


useEffect(() => {
  const fetchData = async () => {
    try {
      let response;
      if (role === "Admin") {
       response = await axiosInstance.get('/classe');
      const cls = response.data.filter((student) => student.id_ecole === idEcole);
      setClasses(cls);} else{
        response = await axiosInstance.get('/classe');
      setClasses(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  fetchData();
}, []);

useEffect(() => {
  const fetchData = async () => {
    try {
      let response;
      if (role === "Admin") {
        response = await axiosInstance.get('/niveau');
        const Nv = response.data.filter((student) => student.id_ecole === idEcole);
        setNiveau(Nv);
      } else {
        response = await axiosInstance.get('/niveau');
        setNiveau(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  fetchData();
}, [idEcole, role]);
   //console.log(classes);
  const getClassId = (className) => {
    const cls = classes.find((cls) => cls.name == className);
    console.log(classes);
    if (cls && cls.hasOwnProperty('id')) {
      setidcls(cls.id);
      return parseInt(cls.id);
    } else {
      console.error('Class not found or missing id property');
      return null; // ou une autre valeur par défaut appropriée
    }
  };
  const getNiveauId = (niveauName) => {
    //console.log(niveaux);
    const niveau = niveaux.find((niv) => niv.name === niveauName);
  
  
    //console.log('Niveau:', niveau);
    //console.log(niveauName);
  
    return niveau ? parseInt(niveau.id) : null;
  };
//console.log(id);
const handleSubmit = async (event) => {
  event.preventDefault();

  try {
    if (result) {
      const data = {
        name: result[0].name,
        prenom: result[0].prenom,
        CNE: result[0].CNE,
        CIN: result[0].CIN,
        dateNaissance: result[0].dateNaissance,
        email: result[0].email,
        Tel: result[0].Tel,
        montant: result[0].montant,
        id_ecole: idEcole,
        niveau_id: getNiveauId(result[0].niveau),
        class_id: getClassId(result[0].class)
      };
      
     
      const response = await axios.post('http://localhost:8000/api/eleves/upload', data);
      
      console.log(response.data);
      // Traiter la réponse de l'API
      // ...
      Navigate('/admin/students');
    }
  } catch (error) {
    console.error(error); // Gérer les erreurs
  }
};

  return (
    <AdminLayout>
      <div className="rounded-lg p-4 shadow px-6 pt-6 min-h-screen justify-center">
        <h2 className="text-2xl font-semibold mb-4">Upload file students</h2>
        <form onSubmit={handleSubmit}>
          <input type="file" className="border rounded-lg px-4 py-2 w-full" name="file" onChange={handleFile} />
          <div className="justify-center">
            <button
              type="submit"
              className="bg-green-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
              disabled={!result}
            >
              Upload
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default FileUploadEleves;