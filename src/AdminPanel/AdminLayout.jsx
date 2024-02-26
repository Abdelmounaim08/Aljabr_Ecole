// AdminDashboardLayout.js
import React from 'react';
import SideBar from './SideBar';
import Header from './Header';

const AdminLayout = ({ children }) => {
  return (
    <div className="flex">
      <SideBar />
      
      <div className="flex flex-col flex-1">
       <Header/>
       <div className='bg-gray-100 '>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
