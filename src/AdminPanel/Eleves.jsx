import React from 'react';
import AdminLayout from './AdminLayout';
import { useState, useEffect } from 'react';
import axiosInstance from '../API/Axios';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { HiOutlineSearch } from 'react-icons/hi';

import { FaRegEdit } from 'react-icons/fa';
import { MdDeleteOutline } from 'react-icons/md';
import PopUpModal from '../assets/PopUpModal';
import ReactPaginate from 'react-paginate';

const Eleves = () => {
  const id = useSelector((state) => state.auth.user.user.id_ecole);
  const InfUser = useSelector(state => state.auth.user);
  const role = InfUser.user.role;
  //const [student, setStudent] = useState([]);
  const [classe, setclass] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [selectedclass, setSelectedclass] = useState('');
  const [selectedNV, setSelectedNV] = useState('');

  const [niveau, setNiveau] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [studentsPerPage, setstudentsPerPage] = useState();
  const [filteredUsers, setFilteredUsers] = useState([]);
  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentStudent = filteredUsers.slice(startIndex, endIndex);
 

  const handleDeleteClick = async (id) => {
    try {
      await axiosInstance.delete(`/eleve/delete/${id}`);
      
      
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eleveResponse, classeResponse, niveauResponse] = await Promise.all([
         
          axiosInstance.get('/eleve'),
          axiosInstance.get('/classe'),
          axiosInstance.get('/niveau'),
        ]);
  
        
  
        let filteredStudents = eleveResponse.data;
  
        if (role === 'Admin') {
          filteredStudents = eleveResponse.data.filter((student) => student.id_ecole === id);
        }
  
        if (selectedNV !== '') {
          filteredStudents = filteredStudents.filter((student) => student.niveau_id == selectedNV);
        }
  
        if (selectedclass !== '') {
          filteredStudents = filteredStudents.filter((student) => student.class_id == selectedclass);
        }
  
        if (searchInput !== '') {
          filteredStudents = filteredStudents.filter(
          (student) =>
            student.name.toLowerCase().includes(searchInput.toLowerCase()) ||
            student.prenom.toLowerCase().includes(searchInput.toLowerCase())
          );
        }
        setFilteredUsers(filteredStudents);
        setclass(classeResponse.data);
        setNiveau(niveauResponse.data);
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchData();
  }, [id, selectedclass, searchInput, selectedNV, role,handleDeleteClick]);
  
  // ...
  
  const handleExport = () => {
    axiosInstance({
      url: '/eleves/template',
      method: 'GET',
      responseType: 'blob',
    })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'eleves.xlsx');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((error) => {
        console.error('Error exporting data:', error);
      });
  };


  return (
    <AdminLayout>
      <div className='min-h-screen w-full md:w-full px-6  '>
        <div className='justify-between items-center text-center md:flex  gap-2 grid grid-cols-1'>
          <div className='text-2xl text-center font-semibold tracking-wide'>
            Students
          </div>

          <div className='rounded-lg p-4 mt-1 pt-1 md:pt-4 flex md:justify-end justify-center items-center gap-4'>
          <div className='relative  text-center mt-6 flex items-center'>
              <div className='absolute inset-y-0 md:left-0 flex items-center pl-3 pointer-events-none'>
                <HiOutlineSearch className='w-5 h-5 text-gray-500 dark:text-gray-400' />
              </div>
              <input
                type='search'
                id='default-search'
                onChange={(e) => setSearchInput(e.target.value.toLowerCase())}
                className='w-36 md:w-48 sm:w-48 pl-10 pr-4 py-1  rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-opacity-50'
                placeholder='Search by name...'
              />
            </div>
            <div className='flex md:float-left  relative mt-6 space-x-2 md:gap-4 '>
              <select
                className=' px-3 py-1 border rounded-md'
                onChange={(e) => setSelectedclass(e.target.value)}
              >
                <option value=''>Classe</option>
                {classe.map((e, i) => {
                  return (
                    <>
                      <option key={i} value={e.id}>
                        {e.name}
                      </option>
                    </>
                  );
                })}
              </select>
              <select
                className=' px-2 py-1 border rounded-md'
                onChange={(e) => setSelectedNV(e.target.value)}
              >
                <option value=''>level</option>
                {niveau.map((e, i) => {
                  return (
                    <>
                      <option key={i} value={e.id}>
                        {e.name}
                      </option>
                    </>
                  );
                })}
              </select>
            </div>
           
          </div>
        </div>
        <div className='mt-0 w-full min-w-screen overflow-auto  shadow-md bg-white rounded-lg   grid grid-cols-1 md:grid-cols-1 md:w-full'>
          <table className='w-full  bg-white  dark:bg-gray-800 divide-y divide-gray-200 '>
            <thead>
              <tr className='w-full h-16 bg-gray-200 dark:border-gray-200 border-b py-8'>
                <th scope='col'
                          className='px-6 py-3 text-left text-xs font-medium uppercase'>
                  Nom
                </th>
                <th scope='col'
                          className='px-6 py-3 text-left text-xs font-medium uppercase'>
                  prenom
                </th>
                <th scope='col'
                          className='px-6 py-3 text-left text-xs font-medium uppercase'>
                  Level
                </th>
                <th scope='col'
                          className='px-6 py-3 text-left text-xs font-medium uppercase'>
                  Class
                </th>
                <th scope='col'
                          className='px-6 py-3 text-left text-xs font-medium uppercase'>
                  Action
                </th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-200' >
              {currentStudent.map((student,i) => (
                <tr
                  key={i}
                  className='h-16 border-gray-300 dark:border-gray-200 '
                >
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800'>
                    {student.name}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800'>
                    {student.prenom}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800'>
                    {niveau.find((n) => n.id === student.niveau_id)?.name}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800'>
                    {classe.find((c) => c.id === student.class_id)?.name}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800'>
                    <div className='flex items-center'>
                      <Link
                        to={`/admin/eleve/edit/${student.id}`}
                        className='text-blue-600 dark:text-blue-400 hover:underline'
                      >
                        <FaRegEdit />
                      </Link>
                      <button
                        onClick={() => handleDeleteClick(student.id)}
                        className='text-red-600 dark:text-red-400 ml-4 hover:underline'
                      >
                        <MdDeleteOutline />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
         
        </div>
        <div className="flex justify-between items-center mt-4">
            <div>
              <span className="text-sm text-gray-700">
                Showing {startIndex + 1} to{' '}
                {Math.min(endIndex, filteredUsers.length)} of{' '}
                {filteredUsers.length} entries
              </span>
            </div>
            <div>
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className="px-2 py-1 text-sm rounded-md bg-blue-500 text-white mr-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                onClick={handleNextPage}
                disabled={endIndex >= filteredUsers.length}
                className="px-2 py-1 text-sm rounded-md bg-blue-500 text-white disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        <div className='flex space-x-6 mt-4'>
         <button  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-3 rounded-lg"> <Link to={'/admin/students/uploadEleves'}>upload</Link></button>
       <button  className="bg-blue-500 hover:bg-blue-800 text-white  py-2 px-3 rounded-lg " onClick={handleExport} >Excel model</button>
       <button  className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-3 rounded-lg"> <Link to={'/admin/AddEleve'}>Ajouter </Link></button>
        </div> 
        </div>
    </AdminLayout>
  );
};

export default Eleves;
/*
 useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('/classe');
        const cls = response.data;
        setclass(cls);
        //console.log(classe)
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('/niveau');
        const Nv = response.data;
        setNiveau(Nv);
        //console.log(niveau)
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('/eleve');
        let filteredStudents = response.data;
  
        if (role === 'Admin') {
          filteredStudents = response.data.filter(
            (student) => student.id_ecole === id
          );
        }
  
        if (selectedNV !== '') {
          filteredStudents = filteredStudents.filter(
            (student) => student.niveau_id == selectedNV
          );
        }
  
        if (selectedclass !== '') {
          filteredStudents = filteredStudents.filter(
            (student) => student.class_id == selectedclass
          );
        }
  
        if (searchInput !== '') {
          filteredStudents = filteredStudents.filter((student) =>
            student.name.toLowerCase().includes(searchInput.toLowerCase()) ||
            student.prenom.toLowerCase().includes(searchInput.toLowerCase())
          );
        }
  
        setFilteredUsers(filteredStudents);
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchData();
  }, [id, selectedclass, searchInput, selectedNV,handleDeleteClick]);
  const handleExport = () => {
    axiosInstance({
      url: '/eleves/template',
      method: 'GET',
      responseType: 'blob',
    })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'eleves.xlsx');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((error) => {
        console.error('Error exporting data:', error);
      });
  };
*/