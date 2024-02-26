import React, { useState } from 'react';
import { navItems } from '../assets/navItems';
import { AiOutlineMenu, AiFillFacebook, AiFillInstagram, AiFillLinkedin, AiFillYoutube, AiOutlineClose, AiOutlineDown } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const [openList, setOpenList] = useState(false)
  const [openList1, setOpenList1] = useState(false)
  const [openList2, setOpenList2] = useState(false)

  return (
    <nav className='relative px-3 py-6 mt-2 md:px-4 md:py-2 mx-4 md:mx-6'>
      <div className='flex justify-between items-center gap-2 md:gap-0'>
        <div>
          <img src='https://ecolealjabr.com/wp-content/uploads/2022/12/cropped-Logo-AJ-AEFE.png' className='w-full h-16 md:w-64 md:h-20' alt="Logo" />
        </div>
        <div className='hidden md:block'>
          <ul className='flex gap-4 items-center justify-center flex-wrap font-semibold text-gray-700 text-lg'>
            {navItems.map(item => (
              <li key={item.id} className='hover:scale-110 hover:text-orange-400 cursor-pointer transition-all'>
                {item.item}
              </li>
            ))}
          </ul>
        </div>
        <button className='hidden md:flex font-semibold px-3 py-3 bg-orange-400 rounded-lg text-white'>Admission</button>
        {/* for Mobile */}
        <AiOutlineMenu onClick={() => setOpen(prev => !prev)} className='md:hidden w-6 h-6 text-orange-500' />
        <div className={`md:hidden ${open ? 'block' : 'hidden'} fixed top-0 left-0 bottom-0 right-0 bg-white z-10 p-6`}>
          <AiOutlineClose onClick={() => setOpen(false)} className='absolute top-4 right-4 h-5 w-5' />
          <div className='flex gap-2 mt-6'>
            <a href="https://www.facebook.com/ecolealjabr">
              <AiFillFacebook className='w-6 h-6 cursor-pointer' />
            </a>
            <a href="https://www.instagram.com/al_jabr_casablanca/">
              <AiFillInstagram className='w-6 h-6 cursor-pointer' />
            </a>
            <a href="https://www.linkedin.com/company/holged/mycompany/">
              <AiFillLinkedin className='w-6 h-6 cursor-pointer' />
            </a>
            <a href="https://www.youtube.com/channel/UClLAJEUPuBKkWn3k2vpopcw">
              <AiFillYoutube className='w-6 h-6 cursor-pointer' />
            </a>
          </div>
          <div className='mt-6 max-h-screen overflow-y-scroll'>
            <ul className='font-semibold space-y-2'>
              <li>Acceuil</li>
              <div className='space-x-2'>
                <span>Etablissement</span>
                <AiOutlineDown className='w-3 h-3 inline-block' onClick={() => setOpenList(prev => !prev)}/>
                <ul className={`${openList? 'block' : 'hidden'}`}>
                  <li>Decouvrez Al Jabr</li>
                  <li>Projet d'Etablissement</li>
                  <li>Mots de Chef d'Etablissement</li>
                  <li>Nos Etablissement</li>
                  <li>Activites Educatives</li>
                  <li>Actualites</li>
                </ul>
              </div>
              <div className='space-x-2'>
                <span>Services</span>
                <AiOutlineDown className='w-3 h-3 inline-block' onClick={() => setOpenList1(prev => !prev)}/>
                <ul className={`${openList1? 'block' : 'hidden'}`}>
                  <li>BCD</li>
                  <li>CDI</li>
                  <li>CIO</li>
                </ul>
              </div>
              <div className='space-x-2'>
                <span>Cursus Scolaire</span>
                <AiOutlineDown className='w-3 h-3 inline-block' onClick={() => setOpenList2(prev => !prev)} />
                <ul className={`${openList2? 'block' : 'hidden'}`}>
                  <li>Ecole MAternelle</li>
                  <li>Ecole Elementaire</li>
                  <li>College</li>
                  <li>Lycee</li>
                </ul>
              </div>
              <li>Vie Scolaire</li>
              <li>Recrutement</li>
              <Link to='/contact'>
                Contact
              </Link>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
