import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ZodiacGrid } from './components/ZodiacGrid';
import { HoroscopePage } from './components/HoroscopePage';
import { ElementPage } from './components/ElementPage';
import { zodiacSigns } from './data/zodiacSigns';

function HomePage() {
  const [birthDate, setBirthDate] = useState('');
  const navigate = useNavigate();

  const findZodiacSign = (date) => {
    const birth = new Date(date);
    const day = birth.getDate();
    const month = birth.getMonth() + 1;

    return zodiacSigns.find((sign) => {
      const [startMonth, startDay] = sign.startDate.split('/').map(Number);
      const [endMonth, endDay] = sign.endDate.split('/').map(Number);

      return (
        (month === startMonth && day >= startDay) ||
        (month === endMonth && day <= endDay)
      );
    });
  };

  const handleFindZodiac = () => {
    const sign = findZodiacSign(birthDate);
    if (sign) navigate(`/horoscope/${sign.name}`);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="mb-6 flex flex-col sm:flex-row items-center gap-4">
        <label className="text-white text-lg">Entrez votre date de naissance :</label>
        <input 
          type="date" 
          value={birthDate} 
          onChange={(e) => setBirthDate(e.target.value)} 
          className="p-2 rounded-lg bg-[#0c1023] text-white border border-[#219bf1] focus:outline-none focus:ring-2 focus:ring-[#219bf1] hover:border-white transition-all duration-300"
        />
        <button 
          onClick={handleFindZodiac} 
          className="p-2 px-4 border border-[#219bf1] text-[#219bf1] rounded-lg hover:bg-[#219bf1] hover:text-white transition-all duration-300"
        >
          Trouver mon signe
        </button>
      </div>
      <ZodiacGrid />
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen" style={{ backgroundColor: '#12172d' }}>
        <header 
          className="w-full text-center mb-12 relative bg-cover bg-center bg-no-repeat py-16"
          style={{ backgroundImage: "url('https://cdn.leonardo.ai/users/ff1a89c1-6820-4b42-9db9-41789d24780d/generations/86d79907-e5da-457b-a4c1-5e2ec049f130/Leonardo_Phoenix_09_create_a_visually_striking_background_imag_2.jpg')" }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="relative z-10 max-w-4xl mx-auto px-4">
            <h1 className="text-7xl font-semibold text-[#ca416e] mb-6">
              Votre Horoscope
            </h1>
            <p className="text-[#ffff] text-xl">
              Consultez votre horoscope du jour et découvrez toutes les énergies <br />
              qui gravitent autour de votre signe !
            </p>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/horoscope/:signName" element={<HoroscopePage />} />
            <Route path="/element/:elementName" element={<ElementPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
