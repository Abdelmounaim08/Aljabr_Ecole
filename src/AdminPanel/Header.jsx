import React from 'react'
import { Link } from 'react-router-dom'


import { Navbar } from 'flowbite-react';
import { LuLayoutDashboard } from 'react-icons/lu';
import { FiUsers } from 'react-icons/fi';
import { RiAdminLine } from 'react-icons/ri';
import { FiMail } from 'react-icons/fi';
import { FaCreditCard } from 'react-icons/fa';
import { FaSchool } from 'react-icons/fa';
import uuid from 'react-uuid';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';

const barItems = [
  {
    id: uuid(),
    name: 'Dashboard',
    icon: <LuLayoutDashboard />,
    route: '/admin/dashboard'
  },
  {
    id: uuid(),
    name: 'Paiment',
    icon: <FiUsers />,
    route: '/admin/users'
  },
  {
    id: uuid(),
    name: 'Students',
    icon: <FiUsers />,
    route: '/admin/students'
  },
  {
    id: uuid(),
    name: 'Admins',
    icon: <RiAdminLine />,
    route: '/admin/admins'
  }
];
const Items = [
  {
    id: uuid(),
    name: 'Dashboard',
    icon: <LuLayoutDashboard />,
    route: '/admin/dashboard'
  },
  {
    id: uuid(),
    name: 'Paiments',
    icon: <FaCreditCard />,
    route: '/admin/users'
  },
  {
    id: uuid(),
    name: 'Students',
    icon: <FiUsers />,
    route: '/admin/students'
  },
 
  {
    id: uuid(),
    name: 'Ecoles',
    icon: <FaSchool />,
    route: '/admin/Ecoles'
  },
  {
    id: uuid(),
    name: 'Demandes',
    icon: <FiMail />,
    route: '/admin/demande'
  },
  {
    id: uuid(),
    name: 'Admins',
    icon: <RiAdminLine />,
    route: '/admin/admins'
  }
];

const Header = () => {
  const InfUser = useSelector(state => state.auth.user);
  
  const role = InfUser.user.role;
  return <>
   
    <div className='px-3 py-2 container max-w-full bg-lightBlack shaodw-lg  '>
    
      <div className='flex justify-end items-center '>
     
         <div>
          
          <label className="bg-lightBlack text-white pr-2" htmlFor="">{InfUser.user.name}</label></div>
        <div className="dropdown dropdown-end ml-4">
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                        <img src=" https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="profile" />
                        </div>
                    </label>
                   
                    <ul tabIndex={0} className="bg-lightBlack text-lightGray menu menu-compact dropdown-content mt-3 z-10 py-3  shadow rounded-box w-52">
                      < div className=' '>
      
                        <Link to={'/Admin/Profile'}>
                        <li className="hover:text-hover md:ml-4 text-center"> Profile Settings</li>
                            </Link>
                        
                       
                        <Link to='/Admin'>
                          <li className='md:ml-4 text-center pt-3 hover:text-hover'>Logout</li>
                        </Link>
                        </div>
<div className='md:hidden block ' >
                        {role === 'Admin'
            ? barItems.map(item => (
                <Link key={item.id} to={item.route}>
                  <li className='flex items-center gap-2 hover:text-hover cursor-pointer transition-all'>
                    {item.icon} {item.name}
                  </li>
                </Link>
              ))
            : Items.map(item => (
                <Link key={item.id} to={item.route}>
                  <li className='flex items-center gap-2 hover:text-hover cursor-pointer transition-all'>
                    {item.icon} {item.name}
                  </li>
                </Link>
              ))}</div>
                    </ul>
                </div>
               
      </div>
     
    </div>
   
   
  </>
}

export default Header
/* 

<div className='px-3 py-2 bg-lightBlack shaodw-lg md:w-full '>
      <div className='flex justify-end items-center'>
         <div><label className="bg-lightBlack text-white pr-2" htmlFor="">{InfUser.user.name}</label></div>
        <div className="dropdown dropdown-end ml-4">
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                        <img src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="profile" />
                        </div>
                    </label>
                   
                    <ul tabIndex={0} className="bg-lightBlack text-lightGray menu menu-compact dropdown-content mt-3 z-10 py-3  shadow rounded-box w-52">
                        <li className="hover:text-hover">
                        <Link to={'/Admin/Profile'}>
                            Profile Settings
                            </Link>
                        </li>
                       
                        <Link to='/Admin'>
                          <li className='ml-4 hover:text-hover'>Logout</li>
                        </Link>
                       
                    </ul>
                </div>
      </div>
    </div>
     <div> 
    <Navbar fluid rounded>
  
  <Navbar.Toggle />
  
  <Navbar.Collapse>
  <div className='sm:hidden' >
    <Navbar.Link href="#" active>
      Home
    </Navbar.Link>
    <Navbar.Link as={Link} href="#">
      About
    </Navbar.Link>
    <Navbar.Link href="#">Services</Navbar.Link>
    <Navbar.Link href="#">Pricing</Navbar.Link>
    <Navbar.Link href="#">Contact</Navbar.Link></div>
  </Navbar.Collapse>
</Navbar>     
 </div>*/