import React from "react";
import { Link } from "react-router-dom";

const zodiacSigns = [
  "Bélier", "Taureau", "Gémeaux", "Cancer", "Lion", "Vierge", 
  "Balance", "Scorpion", "Sagittaire", "Capricorne", "Verseau", "Poissons"
];

export const HoroscopeList: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {zodiacSigns.map((sign) => (
        <Link 
          key={sign} 
          to={`/horoscope/${sign.toLowerCase()}`} 
          className="p-4 border rounded-lg shadow-lg bg-[#1a1e3b] text-white hover:bg-[#ca416e] transition-all"
        >
          <h2 className="text-3xl font-bold text-center mb-4">{sign}</h2>
          <p className="text-center">Cliquez pour voir votre horoscope complet</p>
        </Link>
      ))}
    </div>
  );
};
