import React from 'react';

const Home: React.FC = () => {
  const scrollToRsvp = () => {
    document.getElementById('rsvp')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center pt-24 md:pt-0 overflow-hidden bg-[#FDFBF7]">
      
      {/* Main Image Container */}
      <div className="relative z-10 w-full max-w-5xl px-4 md:px-8 flex items-center justify-center">
        <img 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuC2EJb8sFtqumDR9tsx8q0gOT8kyO2vt2McADTNiiSiv4z93sb7EUDlb78cCrOxtQWdm0V70KhuYwrQ3cd0Cno5Ajnl9Er3rTPI8II-6UabIonSrwMpdaPlbNtF-R90P4pYXYa07jzPByTKOa95qBZ0xaYCoMiUj5yEzjOq73UqUknHD70ubd52hZHe2knxneJ0qf1EL8hWrfs-aoytNfpg6qUld1GgXU_IaPUcvk_uYxT6sirsY0vqi4MVISrdvLAB2koGvNwAZ_bY"
          alt="Elena & Dario - Save the Date"
          className="w-full h-auto max-h-[70vh] object-contain drop-shadow-sm rounded-lg"
        />
      </div>

      {/* RSVP Button - Positioned below image */}
      <div className="relative z-20 mt-8 animate-fade-in-up">
        <button 
          onClick={scrollToRsvp}
          className="bg-primary hover:bg-[#b08d4b] text-white font-sans uppercase text-xs tracking-[0.2em] px-12 py-4 rounded-full shadow-lg transition-all hover:scale-105 active:scale-95"
        >
          Conferma Presenza
        </button>
      </div>

      {/* Background Decor (Subtle) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-1 opacity-40 animate-bounce z-20">
        <span className="text-[10px] uppercase tracking-widest text-secondary font-sans">Scorri</span>
        <span className="material-icons text-secondary text-lg">keyboard_arrow_down</span>
      </div>
    </div>
  );
};

export default Home;