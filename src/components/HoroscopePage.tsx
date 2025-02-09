import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { HoroscopeCard } from "./HoroscopeCard";
import { ZodiacGrid } from "./ZodiacGrid"; 
import { zodiacSigns } from "../data/zodiacSigns";
import type { TimeFrame } from "../types";

// Sélecteur de période
const TimeFrameSelector = ({ selectedTimeFrame, onSelectTimeFrame }: { selectedTimeFrame: TimeFrame, onSelectTimeFrame: (timeFrame: TimeFrame) => void }) => {
  return (
    <div className="flex justify-center space-x-4 mb-6">
      {['daily', 'weekly', 'monthly', 'yearly'].map((timeFrame) => (
        <button
          key={timeFrame}
          onClick={() => onSelectTimeFrame(timeFrame as TimeFrame)}
          className={`p-2 px-5 rounded-lg transition-all duration-300 ${
            selectedTimeFrame === timeFrame 
              ? 'bg-indigo-600 text-white font-semibold shadow-lg' 
              : 'bg-[#12172d] text-[#219bf1] hover:bg-indigo-700 hover:text-white'
          }`}
        >
          {timeFrame.charAt(0).toUpperCase() + timeFrame.slice(1)}
        </button>
      ))}
    </div>
  );
};

export const HoroscopePage: React.FC = () => {
  const { signName } = useParams<{ signName: string }>();
  const navigate = useNavigate();
  const selectedSign = zodiacSigns.find((sign) => sign.name.toLowerCase() === signName?.toLowerCase());

  const [selectedTimeFrame, setSelectedTimeFrame] = useState<TimeFrame>('daily');

  return (
    <div className="flex flex-col items-center space-y-8 w-full">
      {/* Bouton Retour Accueil aligné à gauche */}
      <div className="w-full max-w-5xl">
        <button
          onClick={() => navigate("/")}
          className="border border-[#219bf1] text-[#219bf1] px-6 py-2 rounded-lg font-semibold transition-all hover:bg-[#219bf1] hover:text-white bg-transparent"
        >
          ⬅️ Retour à l'accueil
        </button>
      </div>

      {/* Sélecteur de période */}
      <TimeFrameSelector selectedTimeFrame={selectedTimeFrame} onSelectTimeFrame={setSelectedTimeFrame} />

      {/* Horoscope affiché avec le temps sélectionné */}
      <HoroscopeCard signName={signName} selectedTimeFrame={selectedTimeFrame} />

      {/* Grille des signes */}
      <div className="w-full max-w-5xl">
        <h3 className="text-2xl font-semibold text-white text-center mb-12 mt-14">
          Sélectionnez un autre signe
        </h3>
        <ZodiacGrid onSelectSign={() => {}} selectedSign={selectedSign} />
      </div>
    </div>
  );
};
