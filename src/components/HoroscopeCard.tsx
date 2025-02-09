import React, { useEffect, useState } from 'react';
import { Sparkles, Star, Palette, Smile } from 'lucide-react';
import type { Horoscope, TimeFrame } from '../types';
import { zodiacSigns } from '../data/zodiacSigns';

interface HoroscopeCardProps {
  signName?: string;
  selectedTimeFrame: TimeFrame;
}

export function HoroscopeCard({ signName, selectedTimeFrame }: HoroscopeCardProps) {
  const [horoscope, setHoroscope] = useState<Horoscope | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const sign = zodiacSigns.find((zodiac) => zodiac.name.toLowerCase() === signName?.toLowerCase());

  useEffect(() => {
    if (!sign) {
      setError('⚠️ Signe du zodiaque introuvable !');
      setLoading(false);
      return;
    }

    const fetchHoroscope = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:3001/horoscope/${sign.name.toLowerCase()}/${selectedTimeFrame}`);

        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des données.');
        }

        const data = await response.json();
        setHoroscope(data);
      } catch (err) {
        setError('🚨 Impossible de récupérer l’horoscope. Réessayez plus tard.');
      } finally {
        setLoading(false);
      }
    };

    fetchHoroscope();
  }, [sign, selectedTimeFrame]);

  if (loading) {
    return <div className="text-center text-white text-lg">⏳ Chargement...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  if (!sign || !horoscope) {
    return <div className="text-white text-center">❌ Horoscope non trouvé pour {signName}.</div>;
  }

  return (
    <div className="bg-[#0c1023] text-white rounded-lg p-6 shadow-xl w-full max-w-5xl">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-3xl font-semibold text-[#7a47a3] mb-8 ">{sign.name} {sign.symbol}</h2>
          <p className="text-gray-400">{sign.date}</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-start space-x-3">
          <Sparkles className="w-5 h-5 text-[#219bf1] mt-1" />
          <p className="flex-1 text-gray-300">{horoscope.prediction}</p>
        </div>

        <div className="grid grid-cols-3 gap-4 text-gray-300">
          <div className="flex items-center space-x-2">
            <Star className="w-4 h-4 text-[#219bf1]" />
            <span className="text-sm">Chance: {horoscope.lucky_number}</span>
          </div>

          <div className="flex items-center space-x-2">
            <Palette className="w-4 h-4 text-[#219bf1]" />
            <span className="text-sm">Couleur: {horoscope.lucky_color}</span>
          </div>

          <div className="flex items-center space-x-2">
            <Smile className="w-4 h-4 text-[#219bf1]" />
            <span className="text-sm">Humeur: {horoscope.mood}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
