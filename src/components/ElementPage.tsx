import { Link, useParams } from 'react-router-dom';
import { zodiacSigns } from '../data/zodiacSigns';
import type { ZodiacSign } from '../types';

export function ElementPage() {
  const { elementName } = useParams<{ elementName: string }>();

  // Filtrer les signes qui appartiennent à l'élément sélectionné
  const filteredSigns = zodiacSigns.filter(sign => sign.element.toLowerCase() === elementName?.toLowerCase());

  return (
    <div className="flex flex-col items-center min-h-screen bg-[#12172d] py-10">
      {/* Bouton de retour à l'accueil */}
      <div className="w-full max-w-7xl px-4 mb-6">
        <Link 
          to="/" 
          className="border border-[#219bf1] text-[#219bf1] px-4 py-2 rounded-lg transition-all hover:bg-[#219bf1] hover:text-white"
        >
          ← Retour à l'accueil
        </Link>
      </div>

      {/* Titre */}
      <h2 className="text-5xl font-semibold text-[#ca416e] mb-8 capitalize">
        {elementName}
      </h2>

      {/* Grille des signes centrée */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-5xl">
        {filteredSigns.map(sign => (
          <div key={sign.name} className="p-6 rounded-lg bg-[#0c1023] hover:bg-[#12172d] hover:scale-105 transition-all text-center">
            <div className="mb-4">
              <img src={sign.image} alt={`${sign.name} symbol`} className="w-full h-auto rounded-lg mb-3" />
            </div>
            <h3 className="text-lg font-semibold text-white">{sign.name}</h3>
            <p className="text-sm text-[#b5bad3]">{sign.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
