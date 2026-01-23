import React from 'react';

const Home: React.FC = () => {
  const scrollToRsvp = () => {
    document.getElementById('rsvp')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center pt-24 lg:pt-0 overflow-hidden bg-[#FDFBF7]">
      
      {/* Main Image Container with Text Overlay */}
      <div className="relative z-10 w-full max-w-screen-2xl mx-auto flex flex-col lg:block items-center justify-center px-6 lg:px-12">
        {/* Decorative Frame Container */}
        <div className="relative">
          {/* Decorative Outer Border - Offset */}
          <div className="absolute -inset-4 border border-primary/30 rounded-[2.5rem] lg:rounded-[3.5rem] pointer-events-none transform rotate-1"></div>
          <div className="absolute -inset-4 border border-primary/30 rounded-[2.5rem] lg:rounded-[3.5rem] pointer-events-none transform -rotate-1"></div>
          
          {/* Main Image Box */}
          <div className="relative rounded-[2rem] lg:rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white">
            <img 
              src="https://hujhpdqrsrldaulwisoq.supabase.co/storage/v1/object/public/wedding-photos/E+D_base.jpg"
              alt="Elena & Dario - Save the Date"
              className="w-full h-auto max-h-[70vh] object-cover object-cover"
            />
            {/* Subtle inner vignette */}
            <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-[2rem] lg:rounded-[3rem] pointer-events-none"></div>
          </div>
        </div>
        
        {/* Wedding Text Overlay */}
        <div className="relative mt-8 lg:mt-0 lg:absolute lg:inset-0 flex items-center justify-center">
          <div className="text-center animate-fade-in-up lg:-mt-[4%]">
            <h1 className="text-4xl md:text-6xl text-secondary font-display mb-3 md:mb-4">
              Elena & Dario
            </h1>
            <p className="text-xl md:text-2xl text-secondary font-serif mb-1 md:mb-2">
              30 Maggio 2026
            </p>
            <p className="text-lg md:text-xl text-secondary/80 font-serif">
              Marina di Pisciotta (SA)
            </p>
          </div>
        </div>
      </div>

      {/* RSVP Button - Positioned below image */}
      <div className="relative z-20 mt-8 animate-fade-in-up flex flex-col items-center gap-6">
        <button 
          onClick={scrollToRsvp}
          className="bg-primary hover:bg-[#b08d4b] text-white font-sans uppercase text-xs tracking-[0.2em] px-12 py-4 rounded-full shadow-lg transition-all hover:scale-105 active:scale-95"
        >
          Conferma Presenza
        </button>
        {/* Scroll Indicator aligned with button */}
        <div className="flex flex-col items-center gap-1 opacity-40 animate-bounce">
          <span className="text-[10px] uppercase tracking-widest text-secondary font-sans">Scorri</span>
          <span className="material-icons text-secondary text-lg">keyboard_arrow_down</span>
        </div>
      </div>

      {/* Background Decor (Subtle) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>
      </div>
    </div>
  );
};

export default Home;