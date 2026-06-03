import React, { useState } from 'react';

const VIDEO_URL =
  'https://hujhpdqrsrldaulwisoq.supabase.co/storage/v1/object/public/wedding-photos/Bride_twirls_to_final_pose_202605291300.mp4';
const COVER_IMAGE =
  'https://hujhpdqrsrldaulwisoq.supabase.co/storage/v1/object/public/wedding-photos/oggi_sposi_wide.png';

const Home: React.FC = () => {
  const [videoEnded, setVideoEnded] = useState(false);

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center pt-24 lg:pt-28 overflow-hidden bg-[#FDFBF7]">

      {/* ── Main Image / Video Container ── */}
      <div className="relative z-10 w-full max-w-screen-2xl mx-auto flex flex-col lg:block items-center justify-center px-6 lg:px-12">

        {/* Decorative Frame */}
        <div className="relative">
          <div className="absolute -inset-4 border border-primary/30 rounded-[2.5rem] lg:rounded-[3.5rem] pointer-events-none transform rotate-1" />
          <div className="absolute -inset-4 border border-primary/30 rounded-[2.5rem] lg:rounded-[3.5rem] pointer-events-none transform -rotate-1" />

          {/* Media box — grid overlay: image (base) + video (on top, fades away) */}
          <div
            className="relative rounded-[2rem] lg:rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white"
            style={{ display: 'grid' }}
          >
            {/* Static image — fades IN when video ends */}
            <img
              src={COVER_IMAGE}
              alt="Elena & Dario — 30 Maggio 2026"
              style={{ gridArea: '1 / 1' }}
              className={`w-full max-h-[70vh] object-cover object-center lg:object-[center_20%] transition-opacity duration-1000 ${
                videoEnded ? 'opacity-100' : 'opacity-0'
              }`}
            />

            {/* Video — fades OUT when ended */}
            <video
              autoPlay
              muted
              playsInline
              onEnded={() => setVideoEnded(true)}
              style={{ gridArea: '1 / 1' }}
              className={`w-full max-h-[70vh] object-cover transition-opacity duration-1000 ${
                videoEnded ? 'opacity-0 pointer-events-none' : 'opacity-100'
              }`}
            >
              <source src={VIDEO_URL} type="video/mp4" />
            </video>

            {/* Inner vignette */}
            <div
              style={{ gridArea: '1 / 1' }}
              className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-[2rem] lg:rounded-[3rem] pointer-events-none z-10"
            />
          </div>
        </div>

        {/* Wedding Text Overlay */}
        <div className="relative mt-8 lg:mt-0 lg:absolute lg:inset-0 flex items-center justify-center">
          <div className="text-center animate-fade-in-up lg:-mt-[4%]">
            <h1 className="text-4xl md:text-6xl text-secondary font-display mb-1 md:mb-2">
              Elena & Dario
            </h1>
            <p className="text-2xl md:text-3xl text-primary font-display mb-3 md:mb-4">
              Sposi!
            </p>
            <p className="text-xl md:text-2xl text-secondary font-serif mb-1 md:mb-2">
              30 Maggio 2026
            </p>
            <p className="text-lg md:text-xl text-secondary/80 font-serif">
              Pisciotta (SA)
            </p>
          </div>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div className="relative z-20 mt-10 animate-fade-in-up flex flex-col items-center gap-1 opacity-40 animate-bounce">
        <span className="text-[10px] uppercase tracking-widest text-secondary font-sans">Scorri</span>
        <span className="material-icons text-secondary text-lg">keyboard_arrow_down</span>
      </div>

      {/* Background Decor */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
      </div>
    </div>
  );
};

export default Home;
