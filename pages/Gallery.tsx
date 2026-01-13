import React, { useState, useEffect } from 'react';

// Placeholder images - using high quality wedding/couple themed images from Unsplash
const PHOTOS = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop",
    alt: "Walking together",
    caption: "Il nostro primo viaggio"
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1511285560982-1356c11d4606?q=80&w=2076&auto=format&fit=crop",
    alt: "Sunset embrace",
    caption: "Golden hour"
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1623789397669-733161bb7d08?q=80&w=2070&auto=format&fit=crop",
    alt: "Beach walk",
    caption: "Dove tutto è iniziato"
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1522673607200-1645062cd958?q=80&w=2043&auto=format&fit=crop",
    alt: "Holding hands",
    caption: "Insieme"
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=2070&auto=format&fit=crop",
    alt: "Celebration",
    caption: "Gioia Pura"
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1529636798458-92182e662485?q=80&w=2069&auto=format&fit=crop",
    alt: "Portrait",
    caption: "Noi"
  }
];

const Gallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Close lightbox on ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedImage(null);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <div className="bg-background min-h-screen py-24 relative overflow-hidden">
      {/* Decorative top border */}
      <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>

      <div className="max-w-6xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-up">
           <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-2 block">Ricordi</span>
           <h2 className="text-5xl md:text-6xl text-secondary font-display mb-6">Momenti</h2>
           <p className="text-gray-500 font-serif max-w-2xl mx-auto italic">
             "Scattiamo foto per avere un biglietto di ritorno verso un momento che altrimenti sarebbe andato perso."
           </p>
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 auto-rows-[300px]">
          {PHOTOS.map((photo, index) => (
            <div 
              key={photo.id}
              className={`
                group relative overflow-hidden rounded-2xl cursor-pointer shadow-md hover:shadow-xl transition-all duration-500
                ${index === 1 || index === 4 ? 'md:col-span-2' : ''}
              `}
              onClick={() => setSelectedImage(photo.src)}
            >
              <img 
                src={photo.src} 
                alt={photo.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-secondary/0 group-hover:bg-secondary/20 transition-colors duration-300 flex items-end justify-center pb-6">
                 <span className="text-white font-serif italic text-lg opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 drop-shadow-md">
                   {photo.caption}
                 </span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in-up"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
          >
            <span className="material-icons text-4xl">close</span>
          </button>

          <img 
            src={selectedImage} 
            alt="Gallery Fullscreen"
            className="max-w-full max-h-[90vh] object-contain rounded-md shadow-2xl"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image itself
          />
        </div>
      )}
    </div>
  );
};

export default Gallery;