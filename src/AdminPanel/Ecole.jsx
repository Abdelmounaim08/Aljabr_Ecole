import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import { HiOutlineSearch } from 'react-icons/hi';
import PopUpModal from '../assets/PopUpModal';
import uuid from 'react-uuid';
import axiosInstance from '../API/Axios';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
const Ecoles = () => {
    const [ecoles, setEcoles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchInput, setSearchInput] = useState('');
  const [filteredEcoles, setFilteredEcoles] = useState([]);
    useEffect(() => {
        fetchEcoles();
      }, []);
    
      useEffect(() => {
        const filtered = ecoles.filter((ecole) =>
          ecole.name.toLowerCase().includes(searchInput)
        );
        setFilteredEcoles(filtered);
        const totalPages = Math.ceil(filtered.length / currentPage);
        setTotalPages(totalPages);
      }, [searchInput, ecoles, currentPage]);
    
      const fetchEcoles = async () => {
        try {
          const response = await axiosInstance.get('/ecoles');
          setEcoles(response.data);
          setFilteredEcoles(response.data);
        } catch (error) {
          console.error('Error fetching ecoles:', error);
        }
      };
    
      const handleDeleteEcoleClick = async (id) => {
        try {
          await axiosInstance.delete(`/ecoles/${id}`);
          fetchEcoles();
        } catch (error) {
          console.error('Error deleting ecole:', error);
        }
      };
    
      const [itemsPerPage, setItemsPerPage] = useState(5);
      const handlePreviousPage = () => {
        setCurrentPage(currentPage - 1);
      };
    
      const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
      };
    
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const currentEcoles = filteredEcoles.slice(startIndex, endIndex);
    
  return (
    <> <AdminLayout><div className="min-h-screen px-6">
    <div className="md:flex justify-between text-center items-center grid-cols-1">
      <div className="text-2xl font-semibold text-center tracking-wide">liste des ecoles </div>
      <div className="rounded-lg p-4 md:flex md:justify-end justify-center  items-center md:gap-4 ">
        {/* Search Input */}
        <div className='relative mt-6 flex  items-center'>
        <div className='absolute inset-y-0 left-0 flex items-center md:pl-3 pointer-events-none'>
          <HiOutlineSearch className='w-5 h-5 text-gray-500 dark:text-gray-400' />
        </div>
        <input
          type='search'
          id='default-search'
          onChange={(e) => setSearchInput(e.target.value.toLowerCase())}
          className='w-46 pl-10 pr-4 py-2 text-center  rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-opacity-50'
          placeholder='Search by name...'
        />
      </div>
      </div>
    </div> <div className="shadow-md bg-white rounded-lg">
            <div className="overflow-auto">
              <div className="min-w-full md:inline-block align-middle overflow-auto grid grid-cols-1 md:grid-cols-1 md:w-full">
                <div className=" w-60">
                  <table className="min-w-full divide-y overflow-auto divide-gray-200">
                  <thead>
  <tr className="bg-gray-200">
    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase">
      Name
    </th>
    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase">
      description
    </th>
    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase">
      Adress
    </th>
    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase">
   contact
    </th>
    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase">
    reseaux
    </th>
    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase">
      sitweb
    </th>
    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase">
      Email
    </th>
    <th scope="col" className="relative px-6 py-3">
      <span className="sr-only text-black">Delete</span>
    </th>
  </tr>
</thead>
                    <tbody>
    {currentEcoles.map((ecole) => (
        <tr key={uuid()} className="bg-white divide-y divide-gray-200">
          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
            {ecole.name}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
            {ecole.description}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
            {ecole.adress}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
            {ecole.contact}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
            {ecole.reseaux}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
            {ecole.mail}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
            {ecole.sitweb}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
            <button
              onClick={() => handleDeleteEcoleClick(ecole.id)}
              className="text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </td>
        </tr>
      ))}</tbody></table>  </div>
      </div>
    </div>
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
                disabled={endIndex >= ecoles.length}
                className="px-2 py-1 text-sm rounded-md bg-blue-500 text-white disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          
           
    </div></AdminLayout>
</>  );
};

export default Ecoles;
  /* <div className='flex space-x-6 mt-4'>
   
       <button  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-3 rounded-lg"> <Link to={'/admin/AddEcole'}>Ajouter </Link></button>
        </div>   */