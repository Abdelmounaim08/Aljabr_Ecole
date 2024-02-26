import React from 'react';
import { Link } from 'react-router-dom';

const Cta = () => {
  return (
    <div className='mx-auto mt-4 md:mt-8 px-4 py-3'>
      <div className='flex flex-col gap-3 md:flex-row md:gap-4'>
        <div className="relative group">
          <img
            src="https://ecolealjabr.com/wp-content/uploads/2022/12/AJ-Oasis-Junior-nouveau-batiment-1024x513-1.png"
            alt="Background Image"
            className='w-full h-56 md:h-72 object-cover'
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity group-hover:opacity-100">
            <Link to='/paiment-en-ligne'><span className="text-white text-4xl">Oasis</span></Link>
          </div>
        </div>
        <div className="relative group">
          <img
            src="https://ecolealjabr.com/wp-content/uploads/2022/12/Bouskoura-1-1536x1024-1.jpg"
            alt="Background Image"
            className='w-full h-56 md:h-72 object-cover'
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity group-hover:opacity-100">
            <Link to='paiment-en-ligne'><span className="text-white text-4xl">Bouskoura</span></Link>
          </div>
        </div>
        <div className="relative group">
          <img
            src="https://ecolealjabr.com/wp-content/uploads/2022/12/Dar_Bouazza_1280x.jpg"
            alt="Background Image"
            className='w-full h-56 md:h-72 object-cover'
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity group-hover:opacity-100">
            <Link to='paiment-en-ligne'><span className="text-white text-4xl">Dar Bouazza</span></Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cta;
