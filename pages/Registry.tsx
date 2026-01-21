import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

// Bank details - update with your actual information
const BANK_DETAILS = {
  intestatario: 'Elena Rossi e Dario Bianchi',
  iban: 'IT00 X000 0000 0000 0000 0000 000',
  banca: 'Nome Banca',
  causale: 'Regalo di nozze Elena e Dario'
};

const Registry: React.FC = () => {
  const [songInput, setSongInput] = useState('');
  const [recentSongs, setRecentSongs] = useState<{ id: number; song_name: string; created_at: string }[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [showBankDetails, setShowBankDetails] = useState(false);

  // Load recent songs
  useEffect(() => {
    loadRecentSongs();
  }, []);

  const loadRecentSongs = async () => {
    try {
      const { data, error } = await supabase
        .from('song_requests')
        .select('id, song_name, created_at')
        .order('created_at', { ascending: false })
        .limit(5);

      if (error) throw error;
      setRecentSongs(data || []);
    } catch (err) {
      console.error('Error loading songs:', err);
    }
  };

  const handleAddSong = async () => {
    if (!songInput.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('song_requests')
        .insert({ song_name: songInput.trim() });

      if (error) throw error;

      setSongInput('');
      await loadRecentSongs(); // Reload the list
    } catch (err) {
      console.error('Error adding song:', err);
      alert('Errore nell\'aggiungere la canzone. Riprova.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddSong();
    }
  };

  // Copy to clipboard function
  const copyToClipboard = async (text: string, fieldName: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(fieldName);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="bg-paper min-h-screen flex flex-col items-center justify-center py-20 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #C5A059 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
      <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
      
      <main className="relative z-10 flex flex-col items-center px-6 max-w-4xl mx-auto w-full">
        
        <div className="grid md:grid-cols-2 gap-16 w-full items-center">
            
            {/* Music Section */}
            <div className="flex flex-col items-center text-center md:items-start md:text-left">
                <div className="bg-secondary/10 p-5 rounded-full mb-6 text-secondary inline-block">
                    <span className="material-icons text-5xl">music_note</span>
                </div>
                <h2 className="font-display text-5xl md:text-6xl text-secondary mb-5">Balla con Noi</h2>
                <p className="text-gray-800 font-serif mb-8 text-lg md:text-xl leading-relaxed font-medium">
                    Vogliamo suonare le canzoni che vi emozionano. Aiutateci a creare la playlist perfetta per la serata.
                </p>

                <div className="w-full relative mb-8">
                    <input 
                        type="text" 
                        value={songInput}
                        onChange={(e) => setSongInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Artista - Titolo Canzone" 
                        className="w-full h-16 pl-6 pr-16 rounded-2xl bg-white shadow-lg shadow-secondary/5 border border-gray-100 outline-none focus:ring-2 focus:ring-secondary/50 text-gray-800 placeholder:text-gray-400 font-sans text-lg"
                        disabled={isSubmitting}
                    />
                    <button 
                        onClick={handleAddSong}
                        disabled={isSubmitting || !songInput.trim()}
                        className="absolute right-3 top-3 bottom-3 w-12 bg-secondary hover:bg-primary text-white rounded-xl flex items-center justify-center transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <span className="material-icons text-2xl">{isSubmitting ? 'hourglass_empty' : 'add'}</span>
                    </button>
                </div>
                
                <div className="space-y-3 w-full opacity-90">
                     {recentSongs.length > 0 ? (
                       recentSongs.map((song) => (
                         <div key={song.id} className="flex items-center gap-3 bg-white/80 p-3 rounded-lg border border-gray-100 shadow-sm animate-fade-in-up">
                           <span className="material-icons text-gray-400 text-base">music_note</span>
                           <span className="text-sm text-gray-600 font-medium">{song.song_name}</span>
                         </div>
                       ))
                     ) : (
                       <>
                         <div className="flex items-center gap-3 bg-white/80 p-3 rounded-lg border border-gray-100 shadow-sm">
                           <span className="material-icons text-gray-400 text-base">history</span>
                           <span className="text-sm text-gray-400 font-medium italic">Nessuna canzone ancora... Sii il primo!</span>
                         </div>
                       </>
                     )}
                </div>
            </div>

            {/* Gift Section */}
            <div className="flex flex-col items-center md:pl-12 border-t md:border-t-0 md:border-l border-primary/20 pt-12 md:pt-0">
                <div className="text-center mb-10">
                    <h2 className="font-display text-4xl md:text-5xl text-primary mb-4">Lista Nozze</h2>
                    <p className="text-gray-800 font-serif text-lg font-medium">
                        La vostra presenza è il nostro regalo più grande. Tuttavia, se desiderate farci un dono, un contributo per il nostro futuro sarebbe molto apprezzato.
                    </p>
                </div>

                {/* Bank Details Section */}
                <div className="w-full bg-white rounded-3xl shadow-lg border border-primary/20 p-8 animate-fade-in-up">
                  <div className="flex flex-col items-center text-center mb-6">
                    <div className="bg-primary/10 p-4 rounded-full mb-4">
                      <span className="material-icons text-3xl text-primary">account_balance</span>
                    </div>
                    <h3 className="font-serif text-xl text-secondary font-semibold">Dettagli Bancari</h3>
                  </div>
                  
                  {!showBankDetails ? (
                    <button
                      onClick={() => setShowBankDetails(true)}
                      className="w-full py-4 px-6 bg-primary hover:bg-primary/90 text-white rounded-xl font-serif text-lg font-semibold transition-colors shadow-md flex items-center justify-center gap-2"
                    >
                      <span className="material-icons">visibility</span>
                      Mostra Dettagli Bancari
                    </button>
                  ) : (
                  <>
                  <div className="space-y-4">
                    {/* Intestatario */}
                    <button 
                      onClick={() => copyToClipboard(BANK_DETAILS.intestatario, 'intestatario')}
                      className="w-full text-left p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-primary/50 hover:bg-primary/5 transition-all group"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-gray-500 font-sans uppercase tracking-wide mb-1">Intestatario</p>
                          <p className="text-gray-800 font-serif font-semibold">{BANK_DETAILS.intestatario}</p>
                        </div>
                        <span className="material-icons text-gray-400 group-hover:text-primary transition-colors">
                          {copiedField === 'intestatario' ? 'check' : 'content_copy'}
                        </span>
                      </div>
                    </button>
                    
                    {/* IBAN */}
                    <button 
                      onClick={() => copyToClipboard(BANK_DETAILS.iban.replace(/\s/g, ''), 'iban')}
                      className="w-full text-left p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-primary/50 hover:bg-primary/5 transition-all group"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-gray-500 font-sans uppercase tracking-wide mb-1">IBAN</p>
                          <p className="text-gray-800 font-mono font-semibold text-sm md:text-base break-all">{BANK_DETAILS.iban}</p>
                        </div>
                        <span className="material-icons text-gray-400 group-hover:text-primary transition-colors flex-shrink-0 ml-2">
                          {copiedField === 'iban' ? 'check' : 'content_copy'}
                        </span>
                      </div>
                    </button>
                    
                    {/* Banca */}
                    <button 
                      onClick={() => copyToClipboard(BANK_DETAILS.banca, 'banca')}
                      className="w-full text-left p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-primary/50 hover:bg-primary/5 transition-all group"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-gray-500 font-sans uppercase tracking-wide mb-1">Banca</p>
                          <p className="text-gray-800 font-serif font-semibold">{BANK_DETAILS.banca}</p>
                        </div>
                        <span className="material-icons text-gray-400 group-hover:text-primary transition-colors">
                          {copiedField === 'banca' ? 'check' : 'content_copy'}
                        </span>
                      </div>
                    </button>
                    
                    {/* Causale */}
                    <button 
                      onClick={() => copyToClipboard(BANK_DETAILS.causale, 'causale')}
                      className="w-full text-left p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-primary/50 hover:bg-primary/5 transition-all group"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-gray-500 font-sans uppercase tracking-wide mb-1">Causale Suggerita</p>
                          <p className="text-gray-800 font-serif font-semibold">{BANK_DETAILS.causale}</p>
                        </div>
                        <span className="material-icons text-gray-400 group-hover:text-primary transition-colors">
                          {copiedField === 'causale' ? 'check' : 'content_copy'}
                        </span>
                      </div>
                    </button>
                  </div>
                  
                  <p className="text-center text-gray-500 text-sm font-serif mt-6 italic">
                    Clicca su un campo per copiarlo
                  </p>
                  </>
                  )}
                </div>
            </div>

        </div>
      </main>
    </div>
  );
};

export default Registry;
