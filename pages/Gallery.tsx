import React, { useState, useEffect } from 'react';

// Placeholder images - using high quality wedding/couple themed images from Unsplash
const PHOTOS = [
  {
    id: 1,
    src: "https://hujhpdqrsrldaulwisoq.supabase.co/storage/v1/object/public/wedding-photos/elena_love_quadrato.JPEG",
    alt: "Love ",
    caption: "Korean Heart"
  },
  {
    id: 2,
    src: "https://hujhpdqrsrldaulwisoq.supabase.co/storage/v1/object/public/wedding-photos/IMG_1207.JPEG",
    alt: "Indonesia Lover",
    caption: "Il primo viaggio insieme"
  },
  {
    id: 3,
    src: "https://hujhpdqrsrldaulwisoq.supabase.co/storage/v1/object/public/wedding-photos/IMG_3825.JPEG",
    alt: "Nix, nivis",
    caption: "Nix, nivis"
  },
  {
    id: 4,
    src: "https://hujhpdqrsrldaulwisoq.supabase.co/storage/v1/object/public/wedding-photos/IMG_8323.JPEG",
    alt: "Villa della Regina",
    caption: "Villa della Regina"
  },
  {
    id: 5,
    src: "https://hujhpdqrsrldaulwisoq.supabase.co/storage/v1/object/public/wedding-photos/IMG_1277.JPEG",
    alt: "Lecce",
    caption: "Gioie del Salento"
  },
  {
    id: 6,
    src: "https://hujhpdqrsrldaulwisoq.supabase.co/storage/v1/object/public/wedding-photos/IMG_7724.JPEG",
    alt: "Caserta",
    caption: "Noi",
    spotifyTrackId: "2J6t6y8oK7MXthd1rDjjwj" // Easter Egg: Specific Track
  },
  {
    id: 7,
    src: "https://hujhpdqrsrldaulwisoq.supabase.co/storage/v1/object/public/wedding-photos/IMG-20201120-WA0003.jpg",
    alt: "First Memory",
    caption: "Primo ricordo"
  },
  {
    id: 8,
    src: "https://hujhpdqrsrldaulwisoq.supabase.co/storage/v1/object/public/wedding-photos/IMG_20210917_185541.jpg",
    alt: "Insieme",
    caption: "Insieme"
  },
  {
    id: 9,
    src: "https://hujhpdqrsrldaulwisoq.supabase.co/storage/v1/object/public/wedding-photos/IMG_20210613_205703.jpg",
    alt: "Primo Cinema",
    caption: "Cinema Lover"
  },
  {
    id: 10,
    src: "https://hujhpdqrsrldaulwisoq.supabase.co/storage/v1/object/public/wedding-photos/IMG_1696.JPG",
    alt: "Felicità",
    caption: "Felicità"
  }
];

const Gallery: React.FC<{ onPlayMusic?: (id: string) => void }> = ({ onPlayMusic }) => {
  const [selectedPhoto, setSelectedPhoto] = useState<typeof PHOTOS[0] | null>(null);

  // Split photos into two rows
  const row1 = PHOTOS.slice(0, 5);
  const row2 = PHOTOS.slice(5, 10);

  // Close lightbox on ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedPhoto(null);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const PhotoCard = ({ photo }: { photo: typeof PHOTOS[0] }) => (
    <div 
      className="flex-none w-[280px] md:w-[350px] aspect-[4/3] group relative overflow-hidden rounded-2xl cursor-pointer shadow-md hover:shadow-xl transition-all duration-500 mx-3"
      onClick={() => {
        setSelectedPhoto(photo);
        if (photo.spotifyTrackId && onPlayMusic) {
          onPlayMusic(photo.spotifyTrackId);
        }
      }}
    >
      <img 
        src={photo.src} 
        alt={photo.alt}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-secondary/0 group-hover:bg-secondary/20 transition-colors duration-300 flex items-center justify-center">
         <span className="text-white font-serif italic text-lg opacity-0 group-hover:opacity-100 transform scale-90 group-hover:scale-100 transition-all duration-500 drop-shadow-md text-center px-4">
           {photo.caption}
         </span>
      </div>
    </div>
  );

  return (
    <div className="bg-background min-h-screen py-24 relative overflow-hidden flex flex-col justify-center">
      {/* Decorative top border */}
      <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10 mb-12">
        {/* Header */}
        <div className="text-center animate-fade-in-up">
           <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-2 block">Ricordi</span>
           <h2 className="text-5xl md:text-6xl text-secondary font-display mb-6">Momenti</h2>
           <p className="text-gray-500 font-serif max-w-2xl mx-auto italic">
           </p>
        </div>
      </div>

      {/* Moving Gallery Rows */}
      <div className="space-y-8 py-4">
        {/* First Row: Left to Right (Normal Marquee) */}
        <div className="relative flex overflow-hidden">
          <div className="flex animate-marquee whitespace-nowrap py-4">
            {[...row1, ...row1, ...row1].map((photo, i) => (
              <PhotoCard key={`${photo.id}-r1-${i}`} photo={photo} />
            ))}
          </div>
        </div>

        {/* Second Row: Right to Left (Reverse Marquee) */}
        <div className="relative flex overflow-hidden">
          <div className="flex animate-marquee-reverse whitespace-nowrap py-4">
            {[...row2, ...row2, ...row2].map((photo, i) => (
              <PhotoCard key={`${photo.id}-r2-${i}`} photo={photo} />
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div 
          className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in-up"
          onClick={() => setSelectedPhoto(null)}
        >
          <button 
            onClick={() => setSelectedPhoto(null)}
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
          >
            <span className="material-icons text-4xl">close</span>
          </button>

          <div className="relative flex flex-col items-center max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <img 
              src={selectedPhoto.src} 
              alt={selectedPhoto.alt}
              className="max-w-full max-h-[75vh] object-contain rounded-md shadow-2xl mb-4"
            />
            {selectedPhoto.caption && (
               <p className="text-white/80 font-serif italic text-xl mt-4 text-center">{selectedPhoto.caption}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;