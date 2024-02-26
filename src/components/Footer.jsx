import React from 'react'
import { AiOutlineInstagram, AiFillYoutube } from 'react-icons/ai';
import { BiLogoFacebook, BiLogoLinkedin} from 'react-icons/bi';
import { MdLocationOn } from 'react-icons/md'
import { BsFillTelephoneFill } from 'react-icons/bs'


const Footer = () => {
  return (
    <footer className='bg-blue-900 mt-4'>
     <div className='mx-auto px-2 py-3 md:px-4 md:py-6 text-white'>
       <div className='flex flex-col items-center justify-start md:flex-row md:items-start md:justify-between gap-6 md:gap-0'>
        {/* container for the logo and social media */}
        <div className='flex flex-col gap-3 pt-3 md:pt-0'>
            <img src='	https://ecolealjabr.com/wp-content/uploads/2022/12/Logos-Footer.png' className='w-full h-20 md:w-72 md:h-28' alt="Logo" />
            <div className='flex justify-center gap-2 mt-6'>
            <a href="https://www.facebook.com/ecolealjabr">
              <BiLogoFacebook className='w-7 h-7 cursor-pointer text-white border rounded-full p-1' />
            </a>
            <a href="https://www.instagram.com/al_jabr_casablanca/">
              <AiOutlineInstagram className='w-7 h-7 cursor-pointer text-white border rounded-full p-1' />
            </a>
            <a href="https://www.linkedin.com/company/holged/mycompany/">
              <BiLogoLinkedin className='w-7 h-7 cursor-pointer text-white border rounded-full p-1' />
            </a>
            <a href="https://www.youtube.com/channel/UClLAJEUPuBKkWn3k2vpopcw">
              <AiFillYoutube className='w-7 h-7 cursor-pointer text-white border rounded-full p-1' />
            </a>
          </div>
        </div>
        {/* Container for Oasis school */}
        <div className='flex items-center flex-col gap-2 text-sm'>
            <h3 className='text-lg md:text-xl font-bold'>Ecole Al jabr Oasis</h3>
            <p className='font-semiBold text-md md:text-lg'>Maternelle/Elementaire</p>
            <div className='flex items-center justify-center gap-1'><MdLocationOn /> Bis, Rue de la Pie, Oasis-Casablanca</div>
            <div className='flex items-center justify-center gap-1'><BsFillTelephoneFill /> 05 22 25 05 75</div>
            <p className='font-semiBold text-lg font-semibold'>College/lycee</p>
             <div className='flex items-center justify-center gap-1'><MdLocationOn /> 40, Rue Ahmed AKRAD, Oasis-Casablanca</div>
            <div className='flex items-center justify-center gap-1'><BsFillTelephoneFill /> 05 22 25 02 17</div>
        </div>
        <div className='flex items-center flex-col gap-2 text-sm'>
            <h3 className='text-lg md:text-xl font-bold'>Ecole Al jabr Bouskoura</h3>
            <p className='font-semiBold text-md md:text-lg'>Maternelle/Elementaire</p>
            <div className='flex items-center justify-center gap-1'><MdLocationOn />Ville verte Bouskoura TR113 P621 –Bouskoura</div>
            <div className='flex items-center justify-center gap-1'><BsFillTelephoneFill /> 05 22 21 01 01</div>
            <p className='font-semiBold text-lg font-semibold'>College/lycee</p>
             <div className='flex items-center justify-center gap-1'><MdLocationOn />Parcelle 618, Ville Verte – Bouskoura</div>
            <div className='flex items-center justify-center gap-1'><BsFillTelephoneFill /> 05 22 99 37 09</div>
        </div>
        <div className='flex items-center flex-col gap-2 text-sm'>
            <h3 className='text-lg md:text-xl font-bold'>Ecole Al jabr Oasis</h3>
            <p className='font-semiBold text-md md:text-lg'>Maternelle/Elementaire/College</p>
            <div className='flex items-center justify-center gap-1'><MdLocationOn />Maternelle/Elementaire/College</div>
            <div className='flex items-center justify-center gap-1'><BsFillTelephoneFill /> 07 00 02 05 24</div>
            <p className='font-semiBold text-md md:text-lg font-semibold'>College/lycee</p>
             <div className='flex items-center justify-center gap-1 text-lg md:tetx-xl font-bold'>Bureau d'inscription Al Jabr</div>
            <div className='flex items-center justify-center gap-1'><BsFillTelephoneFill /> 06 63 78 05 03</div>
        </div>
       </div>
     </div>
     <div className='bg-orange-500 flex itens-center justify-center py-3'>
        <p className='font-bold text-white'>Copyright &copy; 2023 Al Jabr</p>
     </div>
    </footer>
  )
}

export default Footer