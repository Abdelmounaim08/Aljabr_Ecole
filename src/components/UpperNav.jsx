import React from 'react'
import {AiFillFacebook, AiFillInstagram, AiFillLinkedin, AiFillYoutube} from 'react-icons/ai'


const UpperNav = () => {
  return (
    <>
    {/* For Desktop */}
      <div className='hidden md:block container mx-auto px-4 py-6 border-b-2'>
        <div className='flex justify-between items-center'>
          <div className='flex gap-4'>
                <a href="https://www.facebook.com/ecolealjabr">
                  <AiFillFacebook className='w-6 h-6 cursor-pointer'/>
                </a>
            <a href="https://www.instagram.com/al_jabr_casablanca/">
                <AiFillInstagram className='w-6 h-6 cursor-pointer'/>
            </a>
            <a href="https://www.linkedin.com/company/holged/mycompany/">
            <AiFillLinkedin className='w-6 h-6 cursor-pointer'/>
            </a>
            <a href="https://www.youtube.com/channel/UClLAJEUPuBKkWn3k2vpopcw">
                <AiFillYoutube className='w-6 h-6 cursor-pointer'/>
            </a>
          </div>
          <div className='flex gap-2'>
            <img src='https://ecolealjabr.com/wp-content/uploads/2022/11/kisspng-payment-gateway-computer-icons-e-commerce-payment-payment-5abf4923013e30.3207582815224855390051-300x300.png' className='w-6 h-6'/>
            <span className='font-semibold text-gray-600'>Paiment en ligne</span>
          </div>
        </div>
      </div>

      {/* for Mobile */}
      <div className='md:hidden container mx-auto px-3 py-4'>
         <div className='flex justify-between items-center'>
          <div className='flex gap-2'>
            <img src='https://ecolealjabr.com/wp-content/uploads/2022/11/kisspng-payment-gateway-computer-icons-e-commerce-payment-payment-5abf4923013e30.3207582815224855390051-300x300.png' className='w-5 h-5'/>
            <span className='font-semibold text-gray-600 text-sm'>Paiment en ligne</span>

          </div>
          <div className='flex gap-2'>
            <img src='https://ecolealjabr.com/wp-content/uploads/2023/04/PRONOTE_Installer_client_2022-2.png' className='w-5 h-5'/>
            <span className='font-semibold text-gray-600 text-sm'>Pronote</span>
          </div>
        </div>
        </div>
      </>
  )
}

export default UpperNav