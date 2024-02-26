import React, { useState } from 'react';
import axios from 'axios';
import { parse, format } from 'date-fns';
import AdminLayout from './AdminLayout';
import * as XLSX from 'xlsx';
import { useNavigate } from "react-router-dom";

const FileUploadPaiment = () => {
  const [file, setFile] = useState(null);
  const [jsonData, setJsonData] = useState(null);
  const [result, setRes] = useState(null);
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
          if (header === 'moisPaiment') {
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (result) {
        const formData = new FormData();
        formData.append('CNE', result[0].CNE);
        formData.append('moisPaiment', result[0].moisPaiment);
        formData.append('montant', result[0].montant);

        const response = await axios.post('http://localhost:8000/api/payment/upload', result);
        Navigate('/admin/users');
        //console.log(response.data);
        // Traiter la réponse de l'API
        // ...
      }
    } catch (error) {
      console.error(error); // Gérer les erreurs
    }
  };

  return (
    <AdminLayout>
      <div className="rounded-lg p-4 shadow px-6 pt-6 min-h-screen justify-center">
        <h2 className="text-2xl font-semibold mb-4">Upload file paiment</h2>
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

export default FileUploadPaiment;