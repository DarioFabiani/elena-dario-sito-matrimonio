import React from 'react';

const CHURCH_URL = "https://www.google.it/maps/place/Chiesa+di+Santa+Maria+di+Portosalvo/@40.1035239,15.2247514,17z/data=!3m1!4b1!4m6!3m5!1s0x133ebb6009e40a77:0xeec9663f291c9af9!8m2!3d40.1035198!4d15.2273317!16s%2Fg%2F122jx1rm?entry=ttu&g_ep=EgoyMDI2MDEyMC4wIKXMDSoASAFQAw%3D%3D";
const SUERTE_URL = "https://www.google.com/maps/place/La+Suerte+Eventi/@40.1210133,15.1938833,3051m/data=!3m2!1e3!4b1!4m6!3m5!1s0x133eaf4cbba12e4f:0x940bf1027452b3e9!8m2!3d40.1210148!4d15.2123372!16s%2Fg%2F11h5n9qyhs?entry=ttu&g_ep=EgoyMDI2MDExOS4wIKXMDSoASAFQAw%3D%3D";

interface TimelineItemProps {
  time: string;
  title: string;
  location?: string;
  locationUrl?: string;
  description?: string;
  icon: string;
  image?: string;
  details?: string[];
}

const TimelineItem = ({ time, title, location, locationUrl, description, icon, image, details }: TimelineItemProps) => (
  <div className="grid grid-cols-[56px_1fr] gap-x-4 md:gap-x-6 w-full">
    <div className="flex flex-col items-center w-[56px] shrink-0">
      <div className="w-[3px] h-6 bg-gradient-to-b from-transparent to-primary"></div>
      <div className="flex items-center justify-center w-14 h-14 rounded-full bg-paper border-2 border-primary z-10 shadow-md shrink-0">
        <span className="material-icons text-primary text-3xl">{icon}</span>
      </div>
      <div className="w-[3px] bg-primary/30 h-full grow"></div>
    </div>
    
    <div className="pb-16 pt-2 group min-w-0">
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

            {location && (
              <p className="text-secondary font-bold text-base mb-5 flex items-center gap-2 font-sans uppercase tracking-wider">
                <span className="material-icons text-primary">location_on</span>
                {locationUrl ? (
                  <a href={locationUrl} target="_blank" rel="noopener noreferrer" className="underline hover:text-primary transition-colors">
                    {location}
                  </a>
                ) : location}
              </p>
            )}

            {description && (
              <p className="text-gray-800 text-lg md:text-xl leading-relaxed font-serif font-medium">
                {description}
              </p>
            )}

            {details && details.length > 0 && (
              <ul className={`space-y-2${description ? ' mt-4' : ''}`}>
                {details.map((detail) => (
                  <li key={detail} className="flex items-start gap-2 text-gray-800 text-lg leading-relaxed font-serif font-medium">
                    <span className="material-icons text-primary text-base mt-1.5 shrink-0">chevron_right</span>
                    {detail}
                  </li>
                ))}
              </ul>
            )}
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
                time="13:00 - 14:00"
                icon="restaurant"
                title="Pranzo"
                image="https://hujhpdqrsrldaulwisoq.supabase.co/storage/v1/object/public/wedding-photos/lunch_illustration.png"
                details={[
                  "Presso «La Mareé» per chi è ospite nella struttura.",
                  "Per gli altri ospiti, rinfresco presso casa degli Sposi."
                ]}
            />
            <TimelineItem
                time="15:00 - 16:00"
                icon="directions_walk"
                title="Verso la Chiesa"
                image="https://hujhpdqrsrldaulwisoq.supabase.co/storage/v1/object/public/wedding-photos/walk_illustration.png"
                details={[
                  "15:00 - Navetta da «La Mareé» alla chiesa per chi vuole o non è provvisto di auto",
                  "15:20 – Viaggio dello sposo verso la chiesa, in macchina o a piedi (10/15 min di camminata caldo permettendo)",
                  "15:50 – Uscita di casa della sposa e viaggio verso la chiesa in macchina"
                ]}
            />
            <TimelineItem
                time="16:00 – 17:15"
                icon="church"
                title="Cerimonia"
                location="Chiesa di Santa Maria di Portosalvo"
                locationUrl={CHURCH_URL}
                image="https://lh3.googleusercontent.com/aida-public/AB6AXuBrrhdZV5TH25jQJzrAzns-9N3nYBWDU5AbmKTp2ih9lCIpGDj-uUFxaNLkw4RnwO98wfy4w2KQzLi4ee6Ryj2JPQPmcZYlJhJUoABhM5VhE0Jvq-r4frdpKdt8Pjw2od8ReafLN-7kV4L34hRxE5qbUCogkoyZTAuSducLXoZEY7u_LYgy3GMMEdoboNgNWRHZatOs5_olXuBUXukL6IKCDan-Mmos75hW09R2XMB-YM8WbvjTtvK1LDDILTWUuD_jAcotZaJfgIas"
                description="La cerimonia si svolgerà a Marina di Pisciotta, nella piccola chiesa che si affaccia sul mare. "
            />
            <TimelineItem
                time="17:15 – 18:15"
                icon="photo_camera"
                title="Foto Time"
                location="Davanti alla chiesa"
                image="https://hujhpdqrsrldaulwisoq.supabase.co/storage/v1/object/public/wedding-photos/photos_church_illustration.png"
                description="Dopo la cerimonia, ci sarà un momento dedicato alle foto di gruppo e agli scatti con gli sposi."
            />
            <TimelineItem
                time="18:15 - 18:30"
                icon="directions_car"
                title="Verso La Suerte"
                image="https://hujhpdqrsrldaulwisoq.supabase.co/storage/v1/object/public/wedding-photos/car_illustration.png"
                details={[
                  "Navetta dalla chiesa verso «La Suerte» per chi non è provvisto di macchina"
                ]}
            />
            <TimelineItem
                time="18:30 – 22:30"
                icon="wine_bar"
                title="Rinfresco & Cena"
                location="La Suerte"
                locationUrl={SUERTE_URL}
                image="https://lh3.googleusercontent.com/aida-public/AB6AXuBEO6XbnIinX83MNGOpk-uu26A9GMmpRyS0JhgoSavLgEsd6AHkaROY7FV6dbBQJKIUexEGJgaTHqJ3cxYIOnmQ7UeNjtG-__-7K58BF0p1QDeUhz4HVwRI_8Zlz_ktepZ4qm51J8ihy43m1lrg5JvbhZqBbmZLBV44GKReEb5FEWcbT0kV9U7KIAS83GTsVbg6MkEGIwvcBvkIWCdLh-0QBtrIhE0467BQi2Fv-AQVl-HN1mYgrLWENUJSu76X6WlL-ErtMUf0Mvml"
                details={[
                  "18:30 – Inizio rinfresco a «La Suerte»",
                  "20:00 – Cena"
                ]}
            />
            <TimelineItem
                time="22:30 – 23:00"
                icon="cake"
                title="Taglio Torta"
                location="La Suerte"
                locationUrl={SUERTE_URL}
                image="https://hujhpdqrsrldaulwisoq.supabase.co/storage/v1/object/public/wedding-photos/cake_illustration.png"
                description="Taglio torta e buffet dolci."
            />
            <TimelineItem
                time="23:00 – 01:00"
                icon="nightlife"
                title="Party"
                location="La Suerte"
                locationUrl={SUERTE_URL}
                image="https://hujhpdqrsrldaulwisoq.supabase.co/storage/v1/object/public/wedding-photos/party_illustration.png"
                description="Inizio danze! Con possibilità di ritorno al villaggio."
            />
        </div>
    </div>
  );
};

export default Details;