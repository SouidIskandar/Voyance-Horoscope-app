import { Link } from 'react-router-dom';
import { zodiacSigns } from '../data/zodiacSigns';
import type { ZodiacSign } from '../types';

interface ZodiacGridProps {
  onSelectSign: (sign: ZodiacSign) => void;
  selectedSign?: ZodiacSign;
}

export function ZodiacGrid({ onSelectSign, selectedSign }: ZodiacGridProps) {
  const handleSignClick = (sign: ZodiacSign) => {
    onSelectSign(sign);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Animation fluide vers le haut
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {zodiacSigns.map((sign) => (
        <Link
          to={`/horoscope/${sign.name}`}
          key={sign.name}
          onClick={() => handleSignClick(sign)}
          className={`p-6 rounded-lg transition-all duration-300 border border-transparent hover:border-[#219bf1] ${
            selectedSign?.name === sign.name
              ? 'bg-[#219bf1] text-white shadow-lg scale-105'
              : 'bg-[#0c1023] hover:bg-[#12172d] hover:scale-105'
          }`}
        >
          {/* Image du signe */}
          <div className="mb-4">
            <img 
              src={sign.image} 
              alt={`${sign.name} symbol`} 
              className="w-full h-auto rounded-lg mb-3" 
            />
          </div>

          {/* Informations du signe */}
          <div className="flex flex-col items-center">
            <div className="text-4xl mb-2">{sign.symbol}</div>
            <h3 className="text-lg font-semibold mb-1 text-white">{sign.name}</h3>
            <p className="text-sm opacity-75 text-[#b5bad3]">{sign.date}</p>

            {/* Lien vers la page de l'élément */}
            <Link to={`/element/${sign.element}`} className="text-sm mt-2 self-end px-2 py-1 rounded-full border text-[#219bf1] border-[#219bf1] bg-[#219bf1]/10 hover:bg-[#219bf1] hover:text-white transition">
              {sign.element}
            </Link>
          </div>
        </Link>
      ))}
    </div>
  );
}
