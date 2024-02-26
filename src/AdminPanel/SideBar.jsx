import { LuLayoutDashboard } from 'react-icons/lu';
import { FiUsers } from 'react-icons/fi';
import { RiAdminLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import axios from 'axios';
import uuid from 'react-uuid';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { FiMail } from 'react-icons/fi';
import { FaCreditCard } from 'react-icons/fa';
import { FaSchool } from 'react-icons/fa';
const barItems = [
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

export default function Sidebar() {
  const InfUser = useSelector(state => state.auth.user);
  const role = InfUser.user.role;
  const [data, setData] = useState(null);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false); // Par défaut, le sidebar est masqué sur les écrans de taille mobile

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/ecoles/${InfUser.user.id_ecole}`);
        if (response.data && response.data.message) {
          setData([response.data.message]);
        } else {
          setData([]);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [InfUser]);

  return (
    <aside className="w-56 bg-lightBlack min-h-screen hidden md:block ">
        
      <div className='flex gap-2 h-16 items-center justify-center py-6 border-b-2 border-lightGray'>
        {data !== null ? (
          data.map(item => (
            <div className='flex gap-2 items-center justify-center py-6' key={item.id}>
              <img src={item.image} className='w-18 h-12 center' alt='Item' />
              <h2 className='text-s text-center text-white font-bold font-sans'>{item.name}</h2>
            </div>
          ))
        ) : (
          <h2 className='text-lg text-white font-bold font-sans'>al jaber</h2>
        )}
      </div>
    <div className="">
      <p className='text-lightGray text-xs mt-6 tracking-wider px-3'>MENU</p>
      <div className='w-56 bg-lightBlack min-h-screen '>
        <ul className='text-lightGray flex flex-col gap-4 px-4'>
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
              ))}
        </ul>
      </div>

      </div>

    </aside>
  );
}