import React, { useState, useEffect } from 'react';
import PasswordGate from './components/PasswordGate';
import Home from './pages/Home';
import Story from './pages/Story';
import Rsvp from './pages/Rsvp';
import Details from './pages/Details';
import Registry from './pages/Registry';
import Logistics from './pages/Logistics';
import Gallery from './pages/Gallery';

const Navigation = () => {
  const [activeSection, setActiveSection] = useState('home');

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      // Order must match the render order
      const sections = ['home', 'story', 'gallery', 'details', 'logistics', 'rsvp', 'registry'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && element.offsetTop <= scrollPosition && (element.offsetTop + element.offsetHeight) > scrollPosition) {
          setActiveSection(section);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'story', label: 'La Storia' },
    { id: 'gallery', label: 'Memorie' },
    { id: 'details', label: 'Programma' },
    { id: 'logistics', label: 'Info' },
    { id: 'rsvp', label: 'R.S.V.P.' },
    { id: 'registry', label: 'Lista Nozze' },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 px-6 py-6 bg-background/90 backdrop-blur-sm border-b border-primary/10">
      <div className="max-w-5xl mx-auto relative flex justify-between items-center overflow-x-auto no-scrollbar">
        {/* The "Thread" Line */}
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-primary/40 -z-10 transform -translate-y-1/2 min-w-[700px]"></div>
        
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className={`
              relative px-3 py-1 bg-background text-xs md:text-sm font-serif tracking-widest uppercase transition-all duration-300 whitespace-nowrap
              ${activeSection === item.id ? 'text-primary scale-110 font-bold' : 'text-gray-400 hover:text-primary'}
            `}
          >
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default function App() {
  const [musicTrack, setMusicTrack] = useState<string | null>(null);

  return (
    <PasswordGate>
      <div className="min-h-screen bg-background text-gray-800 font-serif selection:bg-primary/20">
        <Navigation />
        
        <section id="home" className="min-h-screen">
          <Home />
        </section>
        
        <section id="story" className="min-h-screen">
          <Story />
        </section>

        <section id="gallery" className="min-h-screen">
          <Gallery onPlayMusic={setMusicTrack} />
        </section>
        
        <section id="details" className="min-h-screen">
          <Details />
        </section>

        <section id="logistics" className="min-h-screen">
          <Logistics />
        </section>
        
        <section id="rsvp" className="min-h-screen">
          <Rsvp />
        </section>
        
        <section id="registry" className="min-h-screen">
          <Registry />
        </section>

        <footer className="py-12 bg-paper text-center">
          <p className="text-secondary/60 font-serif italic text-lg">
            Fatto con <span className="text-red-400">❤</span> da Dario & Elena
          </p>
        </footer>

        {/* Persistent Music Player */}
        {musicTrack && (
          <div className="fixed bottom-4 right-4 z-50 animate-fade-in-up md:right-8 filter drop-shadow-xl">
            <div className="relative group">
              <button 
                onClick={() => setMusicTrack(null)}
                className="absolute -top-3 -right-3 bg-secondary text-white rounded-full p-1 shadow-md hover:bg-secondary/80 transition-colors z-10 w-6 h-6 flex items-center justify-center"
                title="Stop Music"
              >
                <span className="material-icons text-xs">close</span>
              </button>
              <iframe 
                data-testid="embed-iframe"
                src={`https://open.spotify.com/embed/track/${musicTrack}?autoplay=1`} 
                width="300" 
                height="80" 
                allow="autoplay *; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                title="Background Music"
                className="rounded-xl bg-white border-0"
              ></iframe>
            </div>
          </div>
        )}
      </div>
    </PasswordGate>
  );
}