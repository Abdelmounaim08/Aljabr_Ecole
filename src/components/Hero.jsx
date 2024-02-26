import React from 'react'
import { GiReceiveMoney } from 'react-icons/gi'
import './Hero.css'

const Hero = () => {
  return (
    <div className='gradient mx-auto px-4 md:px-16 py-4 md:py-8 md:mt-6 bg-cyan-500 text-white'>
       <div className='flex flex-col gap-3 lg:flex-row md:gap-4'>
        <div className='space-y-4 flex flex-col items-center justify-center md:justify-start'>
            <div className="flex flex-col items-center">
                <GiReceiveMoney className='w-7 h-7 md:h-10 md:w-10 '/>
                <h1 className='text-xl md:text-3xl font-bold'>Paiment en Ligne</h1>
            </div>
            <p className='max-w-lg text-md md:text-xl tracking-wide'>
            Le paiement en ligne des frais de scolarité est désormais disponible sur notre site web.
            Nous vous invitons à retirer le code de paiement unique de votre enfant auprès du secrétariat.       
            Ce portail simple, pratique et sécurisé, vous permettra de procéder à l’ensemble de vos règlements en seulement quelques clics !						
            </p>
                <button className='px-4 py-2 text-lg md:text-xl border rounded-md hover:bg-orange-500 hover:translate-y-3 transition-all'>Etablissement Souhaite</button>
        </div>
                <img src='https://ecolealjabr.com/wp-content/uploads/2022/12/Paiement-en-ligne-comment-ca-marche.webp'/>
       </div>
       <div>
       </div>
    </div>
  )
}

export default Hero