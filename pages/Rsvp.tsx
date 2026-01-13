import React, { useState } from 'react';

// Mock database to simulate group retreival
const MOCK_FAMILIES: Record<string, string[]> = {
  "dario": ["Dario", "Daniele", "Gemma"],
  "elena": ["Elena", "Giulia"],
  "rossi": ["Mario Rossi", "Anna Verdi", "Luca Rossi"],
};

interface GuestState {
  name: string;
  isAttending: boolean;
  dietaryNotes: string;
}

const Rsvp: React.FC = () => {
  const [step, setStep] = useState<'search' | 'form' | 'success'>('search');
  const [searchName, setSearchName] = useState('');
  const [guests, setGuests] = useState<GuestState[]>([]);
  const [accommodation, setAccommodation] = useState<string>('');
  const [transport, setTransport] = useState<string>('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchName.trim()) return;

    // Normalize search to lower case for mock matching
    const key = searchName.toLowerCase().trim();
    
    // Find group in mock DB or create a single guest entry if not found
    const familyNames = Object.keys(MOCK_FAMILIES).find(k => k.includes(key) || key.includes(k)) 
      ? MOCK_FAMILIES[key] || MOCK_FAMILIES[Object.keys(MOCK_FAMILIES).find(k => key.includes(k))!]
      : [searchName.trim()]; // Fallback: just the typed name

    setGuests(familyNames.map(name => ({ name, isAttending: true, dietaryNotes: '' })));
    setStep('form');
  };

  const updateGuest = (index: number, field: keyof GuestState, value: any) => {
    const newGuests = [...guests];
    newGuests[index] = { ...newGuests[index], [field]: value };
    setGuests(newGuests);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would send { guests, accommodation, transport } to your backend
    console.log({ guests, accommodation, transport });
    setStep('success');
  };

  return (
    <div className="bg-background min-h-screen flex items-center justify-center py-20 relative overflow-hidden text-gray-800">
      <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
      
      {/* Background Decor */}
      <div className="absolute bottom-0 right-0 w-2/3 h-2/3 opacity-30 pointer-events-none">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full fill-primary/20">
          <path d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,81.6,-46.6C91.4,-34.1,98.1,-19.2,95.8,-5.1C93.5,9,82.2,22.4,70.6,33.2C59,44,47.1,52.3,34.8,59.3C22.5,66.4,9.8,72.3,-1.9,75.6C-13.6,78.9,-24.3,79.6,-34.5,74.5C-44.7,69.4,-54.3,58.5,-63.4,47.3C-72.5,36.1,-81.1,24.6,-84.4,11.8C-87.7,-1,-85.7,-15.1,-78.3,-27.2C-70.9,-39.3,-58.1,-49.4,-45.3,-57.1C-32.5,-64.8,-19.7,-70.1,-6.3,-69.2C7.1,-68.3,14.2,-61.2,21.3,-54.1Z" transform="translate(100 100)" />
        </svg>
      </div>

      <main className="relative z-10 max-w-2xl mx-auto px-6 flex flex-col items-center w-full">
        
        {/* Intro Text */}
        {step !== 'success' && (
          <div className="text-center mb-8 animate-fade-in-up">
            <h2 className="font-display text-5xl md:text-6xl text-secondary mb-3">RSVP</h2>
            <p className="font-serif text-gray-700 font-medium text-lg">
              Per favore conferma la tua presenza entro il 28 Febbraio 2026.
            </p>
          </div>
        )}

        <section className="w-full bg-white rounded-[2rem] p-6 md:p-10 shadow-2xl border border-primary/20 relative overflow-hidden transition-all duration-500">
          
          {step === 'search' && (
            <div className="animate-fade-in-up">
               <div className="text-center mb-10">
                  <span className="material-icons text-5xl text-primary mb-4">person_search</span>
                  <h3 className="font-serif text-3xl text-secondary font-bold">Cerca il tuo invito</h3>
                  <p className="text-gray-600 text-lg font-medium mt-3">Inserisci il tuo nome (o cognome) per trovare il tuo nucleo familiare.</p>
               </div>
               
               <form onSubmit={handleSearch} className="flex flex-col gap-6">
                  <input 
                    className="w-full border-b-2 border-gray-300 bg-transparent py-4 px-2 text-secondary placeholder:text-gray-400 focus:border-primary focus:outline-none text-2xl font-serif text-center transition-colors font-bold" 
                    placeholder="es. Dario" 
                    type="text" 
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                    required
                  />
                  <button type="submit" className="bg-secondary text-white font-serif text-xl font-bold py-5 rounded-full hover:bg-primary shadow-lg hover:shadow-xl transition-all mt-4">
                    Cerca Invito
                  </button>
                  <p className="text-sm text-center text-gray-500 italic mt-2">
                    (Prova a cercare "Dario" per vedere la demo del gruppo)
                  </p>
               </form>
            </div>
          )}

          {step === 'form' && (
             <form onSubmit={handleSubmit} className="animate-fade-in-up space-y-12">
               
               {/* Guest List Section */}
               <div className="space-y-6">
                 <div className="flex items-center gap-3 mb-6 border-b-2 border-primary/10 pb-3">
                    <span className="material-icons text-primary text-3xl">groups</span>
                    <h3 className="font-bold text-secondary uppercase text-base tracking-widest">Ospiti</h3>
                 </div>
                 
                 {guests.map((guest, index) => (
                   <div key={index} className="bg-paper p-6 rounded-2xl border border-primary/20 hover:border-primary/40 transition-colors shadow-sm">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-4">
                        <span className="font-display text-4xl text-secondary">{guest.name}</span>
                        
                        {/* Attendance Toggle */}
                        <div className="flex bg-white rounded-full p-1.5 shadow-sm border border-gray-200 shrink-0">
                          <button
                            type="button"
                            onClick={() => updateGuest(index, 'isAttending', true)}
                            className={`px-6 py-2 rounded-full text-base font-bold transition-all ${guest.isAttending ? 'bg-primary text-white shadow-md' : 'text-gray-500 hover:text-gray-700'}`}
                          >
                            Ci sarò
                          </button>
                          <button
                            type="button"
                            onClick={() => updateGuest(index, 'isAttending', false)}
                            className={`px-6 py-2 rounded-full text-base font-bold transition-all ${!guest.isAttending ? 'bg-secondary text-white shadow-md' : 'text-gray-500 hover:text-gray-700'}`}
                          >
                            Non ci sarò
                          </button>
                        </div>
                      </div>

                      {/* Allergies - Only visible if attending */}
                      {guest.isAttending && (
                        <div className="mt-4 animate-fade-in-up bg-white p-4 rounded-xl border border-gray-100">
                          <label className="text-sm font-bold text-gray-700 uppercase tracking-wider block mb-2 flex items-center gap-2">
                            <span className="material-icons text-lg text-primary">restaurant_menu</span> Allergie o Intolleranze
                          </label>
                          <input 
                            type="text"
                            value={guest.dietaryNotes}
                            onChange={(e) => updateGuest(index, 'dietaryNotes', e.target.value)}
                            placeholder="Scrivi qui (es. Celiachia, Vegano...)"
                            className="w-full bg-gray-50 border-b-2 border-gray-200 py-3 px-4 text-base md:text-lg text-gray-900 focus:border-primary focus:bg-white focus:outline-none transition-all rounded-lg"
                          />
                        </div>
                      )}
                   </div>
                 ))}
               </div>

               {/* Logistics Section */}
               {guests.some(g => g.isAttending) && (
                 <div className="space-y-10 pt-4">
                    <div className="flex items-center gap-3 mb-6 border-b-2 border-primary/10 pb-3">
                        <span className="material-icons text-primary text-3xl">luggage</span>
                        <h3 className="font-bold text-secondary uppercase text-base tracking-widest">Logistica</h3>
                    </div>

                    {/* Accommodation */}
                    <div>
                      <label className="block text-secondary font-serif text-xl font-bold mb-4">Pernotterete al villaggio "La Marée"?</label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {[
                          { id: 'none', label: 'No, grazie' },
                          { id: 'event_night', label: 'Solo notte evento' },
                          { id: 'more_nights', label: 'Più notti' }
                        ].map((opt) => (
                          <label key={opt.id} className={`
                            cursor-pointer p-4 rounded-xl border-2 text-center transition-all text-lg
                            ${accommodation === opt.id ? 'border-primary bg-primary/10 text-primary font-bold' : 'border-gray-200 hover:border-gray-300 text-gray-700 bg-gray-50'}
                          `}>
                            <input 
                              type="radio" 
                              name="accommodation" 
                              value={opt.id} 
                              className="sr-only"
                              onChange={(e) => setAccommodation(e.target.value)}
                            />
                            {opt.label}
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Transport */}
                    <div>
                      <label className="block text-secondary font-serif text-xl font-bold mb-4">Come arriverete?</label>
                      <div className="grid grid-cols-2 gap-4">
                        <label className={`
                            cursor-pointer p-5 rounded-xl border-2 flex flex-col items-center gap-3 transition-all
                            ${transport === 'car' ? 'border-primary bg-primary/10 text-primary font-bold' : 'border-gray-200 hover:border-gray-300 text-gray-700 bg-gray-50'}
                          `}>
                            <span className="material-icons text-3xl">directions_car</span>
                            <span className="text-lg">Auto</span>
                            <input 
                              type="radio" 
                              name="transport" 
                              value="car" 
                              className="sr-only"
                              onChange={(e) => setTransport(e.target.value)}
                            />
                        </label>
                        <label className={`
                            cursor-pointer p-5 rounded-xl border-2 flex flex-col items-center gap-3 transition-all
                            ${transport === 'train' ? 'border-primary bg-primary/10 text-primary font-bold' : 'border-gray-200 hover:border-gray-300 text-gray-700 bg-gray-50'}
                          `}>
                            <span className="material-icons text-3xl">train</span>
                            <span className="text-lg">Treno</span>
                            <input 
                              type="radio" 
                              name="transport" 
                              value="train" 
                              className="sr-only"
                              onChange={(e) => setTransport(e.target.value)}
                            />
                        </label>
                      </div>

                      {/* Train Message */}
                      {transport === 'train' && (
                        <div className="mt-6 p-5 bg-tertiary/20 rounded-xl text-secondary text-base font-medium flex gap-4 animate-fade-in-up items-start border border-tertiary/30">
                           <span className="material-icons shrink-0 text-2xl">info</span>
                           <p>Ottima scelta! Vi ricontatteremo più avanti per conoscere l'orario di arrivo esatto e organizzare la navetta dalla stazione.</p>
                        </div>
                      )}
                    </div>
                 </div>
               )}

               <div className="flex gap-4 pt-6">
                 <button 
                    type="button" 
                    onClick={() => setStep('search')}
                    className="flex-1 border-2 border-gray-300 text-gray-600 font-sans text-sm font-bold uppercase tracking-widest py-4 rounded-full hover:bg-gray-100 transition-all"
                 >
                    Indietro
                 </button>
                 <button 
                    type="submit" 
                    className="flex-[2] bg-primary text-white font-sans text-lg font-bold uppercase tracking-widest py-4 rounded-full hover:bg-[#b08d4b] shadow-lg hover:shadow-xl transition-all"
                 >
                    Conferma RSVP
                 </button>
               </div>
             </form>
          )}

          {step === 'success' && (
             <div className="text-center py-10 animate-fade-in-up">
               <div className="w-24 h-24 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                 <span className="material-icons text-5xl">done_all</span>
               </div>
               <h3 className="font-display text-5xl text-secondary mb-4">Grazie!</h3>
               <p className="text-gray-700 font-serif text-xl leading-relaxed max-w-sm mx-auto font-medium">
                 Abbiamo ricevuto la tua conferma. Non vediamo l'ora di festeggiare questo giorno speciale insieme a voi!
               </p>
               <button onClick={() => { setStep('search'); setSearchName(''); setGuests([]); setAccommodation(''); setTransport(''); }} className="text-primary text-sm font-bold mt-12 uppercase tracking-widest hover:underline p-4">
                 Torna alla Home
               </button>
             </div>
           )}

        </section>

        <footer className="mt-20 text-center pb-8 opacity-80">
           <p className="font-display text-5xl text-primary mb-4">Elena & Dario</p>
           <p className="text-sm text-gray-500 mt-6 tracking-widest uppercase font-bold">Made with Love</p>
        </footer>

      </main>
    </div>
  );
};

export default Rsvp;