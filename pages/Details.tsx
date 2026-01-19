import React from 'react';

const TimelineItem = ({ time, title, location, description, icon, image }: any) => (
  <div className="grid grid-cols-[56px_1fr] gap-x-6">
    <div className="flex flex-col items-center">
      <div className="w-[3px] h-6 bg-gradient-to-b from-transparent to-primary"></div>
      <div className="flex items-center justify-center size-14 rounded-full bg-paper border-2 border-primary z-10 shadow-md shrink-0">
        <span className="material-icons text-primary text-3xl">{icon}</span>
      </div>
      <div className="w-[3px] bg-primary/30 h-full grow"></div>
    </div>
    
    <div className="pb-16 pt-2 group">
      {/* Time Display - Significantly improved visibility */}
      <div className="flex items-center gap-3 mb-3">
         <span className="inline-block px-5 py-2 rounded-lg bg-secondary text-white text-xl font-bold tracking-widest font-serif shadow-md">
            {time}
         </span>
         <div className="h-[2px] bg-secondary/10 flex-grow"></div>
      </div>

      <div className="relative bg-white rounded-3xl overflow-hidden shadow-xl border border-primary/20 transition-transform duration-300 group-hover:scale-[1.01]">
        
        {image && (
          <div className="w-full h-56 overflow-hidden relative">
             <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
             <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
             <h3 className="absolute bottom-4 left-6 z-20 font-serif text-3xl md:text-4xl text-white font-bold drop-shadow-lg tracking-wide">{title}</h3>
          </div>
        )}
        
        <div className="p-8">
            {!image && <h3 className="font-serif text-3xl md:text-4xl text-secondary font-bold mb-3">{title}</h3>}
            
            <p className="text-secondary font-bold text-base mb-5 flex items-center gap-2 font-sans uppercase tracking-wider">
               <span className="material-icons text-primary">location_on</span> {location}
            </p>
            
            {/* Increased text size and darkness for readability */}
            <p className="text-gray-800 text-lg md:text-xl leading-relaxed font-serif font-medium">
               {description}
            </p>
        </div>
      </div>
    </div>
  </div>
);

const Details: React.FC = () => {
  return (
    <div className="bg-background min-h-screen py-24 flex flex-col items-center justify-center relative">
        <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>

        <div className="text-center mb-16 px-4 animate-fade-in-up">
           <span className="block text-primary font-bold tracking-[0.3em] uppercase mb-4 text-sm md:text-base">30 Maggio 2026</span>
           <h1 className="text-secondary text-6xl md:text-7xl font-display">Programma</h1>
        </div>

        <div className="max-w-2xl mx-auto px-6 w-full">
            <TimelineItem 
                time="16:00"
                icon="church"
                title="Cerimonia"
                location="Chiesa di Santa Maria di Portosalvo"
                image="https://lh3.googleusercontent.com/aida-public/AB6AXuBrrhdZV5TH25jQJzrAzns-9N3nYBWDU5AbmKTp2ih9lCIpGDj-uUFxaNLkw4RnwO98wfy4w2KQzLi4ee6Ryj2JPQPmcZYlJhJUoABhM5VhE0Jvq-r4frdpKdt8Pjw2od8ReafLN-7kV4L34hRxE5qbUCogkoyZTAuSducLXoZEY7u_LYgy3GMMEdoboNgNWRHZatOs5_olXuBUXukL6IKCDan-Mmos75hW09R2XMB-YM8WbvjTtvK1LDDILTWUuD_jAcotZaJfgIas"
                description="Ci ritroveremo a Marina di Pisciotta per celebrare questo giorno. La chiesa si trova proprio sul porto."
            />
            <TimelineItem 
                time="18:30"
                icon="wine_bar"
                title="Aperitivo & Cena"
                location="La Suerte Eventi"
                image="https://lh3.googleusercontent.com/aida-public/AB6AXuBEO6XbnIinX83MNGOpk-uu26A9GMmpRyS0JhgoSavLgEsd6AHkaROY7FV6dbBQJKIUexEGJgaTHqJ3cxYIOnmQ7UeNjtG-__-7K58BF0p1QDeUhz4HVwRI_8Zlz_ktepZ4qm51J8ihy43m1lrg5JvbhZqBbmZLBV44GKReEb5FEWcbT0kV9U7KIAS83GTsVbg6MkEGIwvcBvkIWCdLh-0QBtrIhE0467BQi2Fv-AQVl-HN1mYgrLWENUJSu76X6WlL-ErtMUf0Mvml"
                description="A soli 15 minuti dalla chiesa, ci sposteremo per un aperitivo al tramonto. Seguirà la cena servita ai tavoli."
            />
            <TimelineItem 
                time="22:30"
                icon="nightlife"
                title="Party"
                location="La Suerte"
                description="Balleremo insieme con la luna ad accompagnarci per tutta la notte!"
            />
        </div>
    </div>
  );
};

export default Details;