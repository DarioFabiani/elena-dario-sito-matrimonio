import React from 'react';

const WeddingVideo: React.FC = () => {
  return (
    <div className="bg-paper min-h-screen py-24 relative overflow-hidden">
      {/* Decorative top border */}
      <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center animate-fade-in-up mb-12">
          <span className="block text-primary font-bold tracking-[0.3em] uppercase text-base mb-4">
            30 MAGGIO 2026
          </span>
          <h2 className="text-secondary font-display mb-6" style={{ fontSize: 'clamp(3rem, 8vw, 5rem)' }}>
            Il Video
          </h2>
          <p className="text-gray-600 font-serif text-xl max-w-xl mx-auto">
            Rivivete con noi il giorno più bello.
          </p>
        </div>

        {/* YouTube embed */}
        <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
          <iframe
            src="https://www.youtube.com/embed/MI8sDJLjRAU"
            title="Video del Matrimonio Elena & Dario — 30 Maggio 2026"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        </div>

        {/* Decorative bottom note */}
        <p className="text-center font-serif italic text-secondary/40 mt-8 text-sm">
          Elena & Dario — Pisciotta, 30 Maggio 2026
        </p>
      </div>

      {/* Background decor */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3"></div>
      </div>
    </div>
  );
};

export default WeddingVideo;
