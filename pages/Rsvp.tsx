import React, { useState } from 'react';
import { supabase, Guest, GuestResponse } from '../lib/supabase';

interface GuestFormState {
  guest: Guest;
  isAttending: boolean;
  dietaryNotes: string;
  hasPlusOne: boolean;
  plusOneName: string;
  plusOneDietaryNotes: string;
}

const Rsvp: React.FC = () => {
  const [step, setStep] = useState<'search' | 'form' | 'success'>('search');
  const [searchName, setSearchName] = useState('');
  const [groupName, setGroupName] = useState('');
  const [guestForms, setGuestForms] = useState<GuestFormState[]>([]);
  const [transport, setTransport] = useState<string>('');
  const [isSearching, setIsSearching] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string>('');
  const [searchError, setSearchError] = useState<string>('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanedName = searchName.trim();
    if (!cleanedName) return;

    const nameParts = cleanedName.split(/\s+/);
    if (nameParts.length < 2) {
      setSearchError("Inserisci nome e cognome per cercare l'invito.");
      return;
    }

    setIsSearching(true);
    setSearchError('');

    try {
      // Search for guests whose name contains the search term (case insensitive)
      const { data: matchingGuests, error: searchErr } = await supabase
        .from('guests')
        .select('*')
        .ilike('name', `%${cleanedName}%`);

      if (searchErr) throw searchErr;

      if (!matchingGuests || matchingGuests.length === 0) {
        setSearchError('Nessun invitato trovato con questo nome. Prova con un altro nome o cognome.');
        return;
      }

      // Get the group name from the first match
      const foundGroupName = matchingGuests[0].group_name;

      // Now fetch all guests in this group
      const { data: groupGuests, error: groupErr } = await supabase
        .from('guests')
        .select('*')
        .eq('group_name', foundGroupName)
        .order('id');

      if (groupErr) throw groupErr;

      if (!groupGuests || groupGuests.length === 0) {
        setSearchError('Errore nel recupero del gruppo. Riprova.');
        return;
      }

      // Initialize form state for each guest
      const formStates: GuestFormState[] = groupGuests.map((guest) => ({
        guest,
        isAttending: true,
        dietaryNotes: '',
        hasPlusOne: false,
        plusOneName: '',
        plusOneDietaryNotes: '',
      }));

      setGroupName(foundGroupName);
      setGuestForms(formStates);
      setStep('form');
      setError('');
    } catch (err: any) {
      console.error('Error searching guests:', err);
      setSearchError('Errore durante la ricerca. Riprova.');
    } finally {
      setIsSearching(false);
    }
  };

  const updateGuestForm = (index: number, field: keyof Omit<GuestFormState, 'guest'>, value: any) => {
    const newForms = [...guestForms];
    newForms[index] = { ...newForms[index], [field]: value };
    setGuestForms(newForms);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // Prepare responses for all guests
      const responses: GuestResponse[] = guestForms.map((form) => ({
        guest_id: form.guest.id,
        is_attending: form.isAttending,
        dietary_notes: form.dietaryNotes || null,
        transport_method: form.isAttending ? transport : null,
        has_plus_one: !!(form.isAttending && form.hasPlusOne && form.plusOneName.trim()),
        plus_one_name: form.isAttending && form.hasPlusOne && form.plusOneName.trim() ? form.plusOneName.trim() : null,
        plus_one_dietary_notes: form.isAttending && form.hasPlusOne && form.plusOneDietaryNotes.trim() ? form.plusOneDietaryNotes.trim() : null,
      }));

      // Upsert responses (insert or update if already exists)
      for (const response of responses) {
        const { error: upsertError } = await supabase
          .from('guest_responses')
          .upsert(response, { onConflict: 'guest_id' });

        if (upsertError) throw upsertError;
      }

      setStep('success');
    } catch (err: any) {
      console.error('Error submitting RSVP:', err);
      setError(err.message || 'Errore durante l\'invio. Riprova.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setStep('search');
    setSearchName('');
    setGroupName('');
    setGuestForms([]);
    setTransport('');
    setError('');
    setSearchError('');
  };

  const attendingCount = guestForms.filter(f => f.isAttending).length;
  const plusOneCount = guestForms.filter(f => f.isAttending && f.hasPlusOne && f.plusOneName.trim()).length;
  const totalAttending = attendingCount + plusOneCount;
  const allowPlusOne = guestForms.length === 1;

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
              Per favore conferma la tua presenza <span className="inline-flex items-center justify-center rounded-full bg-primary/10 px-4 py-1 text-primary font-semibold">entro il 28 Febbraio 2026.</span>
            </p>
          </div>
        )}

        <section className="w-full bg-white rounded-[2rem] p-6 md:p-10 shadow-2xl border border-primary/20 relative overflow-hidden transition-all duration-500">
          
          {/* STEP 1: Search */}
          {step === 'search' && (
            <div className="animate-fade-in-up">
               <div className="text-center mb-10">
                  <span className="material-icons text-5xl text-primary mb-4">person_search</span>
                  <h3 className="font-serif text-3xl text-secondary font-bold">Cerca il tuo invito</h3>
                  <p className="text-gray-600 text-lg font-medium mt-3">Inserisci il tuo nome e cognome per trovare il tuo invito.</p>
               </div>
               
               <form onSubmit={handleSearch} className="flex flex-col gap-6">
                  <input 
                    className="w-full border-b-2 border-gray-300 bg-transparent py-4 px-2 text-secondary placeholder:text-gray-400 focus:border-primary focus:outline-none text-2xl font-serif text-center transition-colors font-bold" 
                    placeholder="es. Mario Rossi" 
                    type="text" 
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                    required
                    disabled={isSearching}
                  />

                  {searchError && (
                    <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-amber-700 text-center flex items-center justify-center gap-2">
                      <span className="material-icons text-xl">warning</span>
                      {searchError}
                    </div>
                  )}

                  <button 
                    type="submit" 
                    disabled={isSearching}
                    className="bg-secondary text-white font-serif text-xl font-bold py-5 rounded-full hover:bg-primary shadow-lg hover:shadow-xl transition-all mt-4 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                  >
                    {isSearching ? (
                      <>
                        <span className="material-icons animate-spin">autorenew</span>
                        Ricerca in corso...
                      </>
                    ) : (
                      'Cerca Invito'
                    )}
                  </button>
               </form>
            </div>
          )}

          {/* STEP 2: Form */}
          {step === 'form' && (
             <form onSubmit={handleSubmit} className="animate-fade-in-up space-y-12">
               
               {/* Group Header */}
               <div className="text-center pb-6 border-b border-primary/20">
                 <p className="text-sm uppercase tracking-widest text-gray-500 font-bold mb-2">Invito trovato</p>
                 <h3 className="font-display text-4xl text-secondary">{groupName}</h3>
                 <p className="text-gray-600 mt-2 font-serif">
                   {guestForms.length} {guestForms.length === 1 ? 'invitato' : 'invitati'} in questo gruppo
                 </p>
               </div>

               {/* Guest List Section */}
               <div className="space-y-6">
                 <div className="flex items-center gap-3 mb-6 border-b-2 border-primary/10 pb-3">
                    <span className="material-icons text-primary text-3xl">groups</span>
                    <h3 className="font-bold text-secondary uppercase text-base tracking-widest">Conferma Presenze</h3>
                 </div>
                 
                 {guestForms.map((form, index) => (
                   <div key={form.guest.id} className="bg-paper p-6 rounded-2xl border border-primary/20 hover:border-primary/40 transition-colors shadow-sm">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-4">
                        <span className="font-display text-4xl text-secondary">{form.guest.name}</span>
                        
                        {/* Attendance Toggle */}
                        <div className="flex bg-white rounded-full p-1.5 shadow-sm border border-gray-200 shrink-0">
                          <button
                            type="button"
                            onClick={() => updateGuestForm(index, 'isAttending', true)}
                            className={`px-6 py-2 rounded-full text-base font-bold transition-all ${form.isAttending ? 'bg-primary text-white shadow-md' : 'text-gray-500 hover:text-gray-700'}`}
                          >
                            Ci sarò
                          </button>
                          <button
                            type="button"
                            onClick={() => updateGuestForm(index, 'isAttending', false)}
                            className={`px-6 py-2 rounded-full text-base font-bold transition-all ${!form.isAttending ? 'bg-secondary text-white shadow-md' : 'text-gray-500 hover:text-gray-700'}`}
                          >
                            Non ci sarò
                          </button>
                        </div>
                      </div>

                      {/* Dietary Notes - Only visible if attending */}
                      {form.isAttending && (
                        <div className="mt-4 animate-fade-in-up bg-white p-4 rounded-xl border border-gray-100">
                          <label className="text-sm font-bold text-gray-700 uppercase tracking-wider block mb-2 flex items-center gap-2">
                            <span className="material-icons text-lg text-primary">restaurant_menu</span> Esigenze Alimentari
                          </label>
                          <input 
                            type="text"
                            value={form.dietaryNotes}
                            onChange={(e) => updateGuestForm(index, 'dietaryNotes', e.target.value)}
                            placeholder="Allergie, intolleranze, dieta vegetariana/vegana..."
                            className="w-full bg-gray-50 border-b-2 border-gray-200 py-3 px-4 text-base md:text-lg text-gray-900 focus:border-primary focus:bg-white focus:outline-none transition-all rounded-lg"
                          />
                        </div>
                      )}

                      {/* Plus One Option - Only visible if attending */}
                      {form.isAttending && allowPlusOne && (
                        <div className="mt-4 animate-fade-in-up">
                          <div className="bg-tertiary/10 p-4 rounded-xl border border-tertiary/30">
                            <label className="flex items-center gap-3 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={form.hasPlusOne}
                                onChange={(e) => updateGuestForm(index, 'hasPlusOne', e.target.checked)}
                                className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
                              />
                              <span className="text-sm font-bold text-secondary uppercase tracking-wider flex items-center gap-2">
                                <span className="material-icons text-lg text-primary">person_add</span> 
                                Porterò un accompagnatore
                              </span>
                            </label>

                            {/* Plus One Details */}
                            {form.hasPlusOne && (
                              <div className="mt-4 space-y-4 animate-fade-in-up pl-8">
                                <div>
                                  <label className="text-xs font-bold text-gray-600 uppercase tracking-wider block mb-1">
                                    Nome dell'accompagnatore *
                                  </label>
                                  <input
                                    type="text"
                                    value={form.plusOneName}
                                    onChange={(e) => updateGuestForm(index, 'plusOneName', e.target.value)}
                                    placeholder="Nome e cognome"
                                    className="w-full bg-white border-b-2 border-gray-200 py-2 px-3 text-base text-gray-900 focus:border-primary focus:outline-none transition-all rounded-lg"
                                    required={form.hasPlusOne}
                                  />
                                </div>
                                <div>
                                  <label className="text-xs font-bold text-gray-600 uppercase tracking-wider block mb-1">
                                    Esigenze alimentari accompagnatore
                                  </label>
                                  <input
                                    type="text"
                                    value={form.plusOneDietaryNotes}
                                    onChange={(e) => updateGuestForm(index, 'plusOneDietaryNotes', e.target.value)}
                                    placeholder="Allergie, intolleranze..."
                                    className="w-full bg-white border-b-2 border-gray-200 py-2 px-3 text-base text-gray-900 focus:border-primary focus:outline-none transition-all rounded-lg"
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                   </div>
                 ))}
               </div>

               {/* Transport Section - Only show if at least one guest is attending */}
               {attendingCount > 0 && (
                 <div className="space-y-6 pt-4">
                    <div className="flex items-center gap-3 mb-6 border-b-2 border-primary/10 pb-3">
                        <span className="material-icons text-primary text-3xl">directions</span>
                        <h3 className="font-bold text-secondary uppercase text-base tracking-widest">Come Raggiungerete l'Evento?</h3>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {[
                        { id: 'car', icon: 'directions_car', label: 'Auto' },
                        { id: 'train', icon: 'train', label: 'Treno' },
                        { id: 'plane', icon: 'flight', label: 'Aereo' },
                        { id: 'other', icon: 'more_horiz', label: 'Altro' },
                      ].map((opt) => (
                        <label 
                          key={opt.id}
                          className={`
                            cursor-pointer p-5 rounded-xl border-2 flex flex-col items-center gap-3 transition-all
                            ${transport === opt.id ? 'border-primary bg-primary/10 text-primary font-bold' : 'border-gray-200 hover:border-gray-300 text-gray-700 bg-gray-50'}
                          `}
                        >
                          <span className="material-icons text-3xl">{opt.icon}</span>
                          <span className="text-lg">{opt.label}</span>
                          <input 
                            type="radio" 
                            name="transport" 
                            value={opt.id} 
                            className="sr-only"
                            checked={transport === opt.id}
                            onChange={(e) => setTransport(e.target.value)}
                          />
                        </label>
                      ))}
                    </div>

                    {/* Train/Plane Message */}
                    {(transport === 'train' || transport === 'plane') && (
                      <div className="mt-6 p-5 bg-tertiary/20 rounded-xl text-secondary text-base font-medium flex gap-4 animate-fade-in-up items-start border border-tertiary/30">
                         <span className="material-icons shrink-0 text-2xl">info</span>
                         <p>
                           {transport === 'train' 
                             ? 'Ottima scelta! Vi ricontatteremo più avanti per conoscere l\'orario di arrivo esatto e organizzare la navetta dalla stazione.'
                             : 'Vi ricontatteremo più avanti per conoscere i dettagli del vostro arrivo e organizzare il trasferimento.'
                           }
                         </p>
                      </div>
                    )}
                 </div>
               )}

               {/* Summary */}
               {(guestForms.length > 1 || plusOneCount > 0) && (
                 <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 text-center">
                   <p className="text-gray-700 font-serif text-lg">
                     <span className="font-bold text-primary">{totalAttending}</span>{' '}
                     {totalAttending === 1 ? 'persona parteciperà' : 'persone parteciperanno'} all'evento
                     {plusOneCount > 0 && (
                       <span className="text-gray-500 text-base block mt-1">
                         ({attendingCount} {attendingCount === 1 ? 'invitato' : 'invitati'} + {plusOneCount} {plusOneCount === 1 ? 'accompagnatore' : 'accompagnatori'})
                       </span>
                     )}
                   </p>
                 </div>
               )}

               {error && (
                 <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-center flex items-center justify-center gap-2">
                   <span className="material-icons">error</span>
                   {error}
                 </div>
               )}

               <div className="flex gap-4 pt-6">
                 <button 
                    type="button" 
                    onClick={resetForm}
                    className="flex-1 border-2 border-gray-300 text-gray-600 font-sans text-sm font-bold uppercase tracking-widest py-4 rounded-full hover:bg-gray-100 transition-all"
                 >
                    Indietro
                 </button>
                 <button 
                    type="submit" 
                    disabled={isSubmitting || (attendingCount > 0 && !transport) || guestForms.some(f => f.isAttending && f.hasPlusOne && !f.plusOneName.trim())}
                    className="flex-[2] bg-primary text-white font-sans text-lg font-bold uppercase tracking-widest py-4 rounded-full hover:bg-[#b08d4b] shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                 >
                    {isSubmitting ? (
                      <>
                        <span className="material-icons animate-spin">autorenew</span>
                        Invio in corso...
                      </>
                    ) : (
                      'Conferma RSVP'
                    )}
                 </button>
               </div>

               {attendingCount > 0 && !transport && (
                 <p className="text-center text-amber-600 text-sm font-medium">
                   Seleziona come raggiungerete l'evento per continuare
                 </p>
               )}

               {guestForms.some(f => f.isAttending && f.hasPlusOne && !f.plusOneName.trim()) && (
                 <p className="text-center text-amber-600 text-sm font-medium">
                   Inserisci il nome dell'accompagnatore per continuare
                 </p>
               )}
             </form>
          )}

          {/* STEP 3: Success */}
          {step === 'success' && (
             <div className="text-center py-10 animate-fade-in-up">
               <div className="w-24 h-24 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                 <span className="material-icons text-5xl">done_all</span>
               </div>
               <h3 className="font-display text-5xl text-secondary mb-4">Grazie!</h3>
               <p className="text-gray-700 font-serif text-xl leading-relaxed max-w-sm mx-auto font-medium">
                 {totalAttending > 0 
                   ? `Abbiamo ricevuto la conferma per ${totalAttending} ${totalAttending === 1 ? 'persona' : 'persone'}. Non vediamo l'ora di festeggiare questo giorno speciale insieme a voi!`
                   : 'Abbiamo ricevuto la tua risposta. Ci mancherete, ma capiamo!'
                 }
               </p>
               <button 
                 onClick={resetForm} 
                 className="text-primary text-sm font-bold mt-12 uppercase tracking-widest hover:underline p-4"
               >
                 Conferma un altro invito
               </button>
             </div>
           )}

        </section>

        <footer className="mt-20 text-center pb-8 opacity-80">
           <p className="font-display text-5xl text-primary mb-4">Elena & Dario</p>
           <p className="text-sm text-gray-500 mt-6 tracking-widest uppercase font-bold">Made with Love</p>
           <div className="mt-6 space-y-3 text-base md:text-lg text-gray-600 font-serif">
             <p className="flex flex-col gap-2 md:flex-row md:items-center md:justify-center md:gap-8">
               <span className="flex items-center gap-2">
                 <span className="material-icons text-base align-middle">phone</span>
                 <span className="font-semibold">Dario:</span>
                 <a href="tel:+393400719042" className="hover:text-primary transition-colors">340 0719042</a>
               </span>
               <span className="flex items-center gap-2">
                 <span className="material-icons text-base align-middle">email</span>
                 <a href="mailto:dario.fabiani96@gmail.com" className="hover:text-primary transition-colors">dario.fabiani96@gmail.com</a>
               </span>
             </p>
             <p className="flex flex-col gap-2 md:flex-row md:items-center md:justify-center md:gap-8">
               <span className="flex items-center gap-2">
                 <span className="material-icons text-base align-middle">phone</span>
                 <span className="font-semibold">Elena:</span>
                 <a href="tel:+393488090124" className="hover:text-primary transition-colors">348 8090124</a>
               </span>
               <span className="flex items-center gap-2">
                 <span className="material-icons text-base align-middle">email</span>
                 <a href="mailto:ecostagliola@gmail.com" className="hover:text-primary transition-colors">ecostagliola@gmail.com</a>
               </span>
             </p>
           </div>
        </footer>

      </main>
    </div>
  );
};

export default Rsvp;