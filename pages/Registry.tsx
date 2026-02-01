import React, { useState, useEffect, useRef } from 'react';

// Supabase configuration from environment variables
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Bank details - update with your actual information
const BANK_DETAILS = {
  intestatario: 'Elena Costagliola',
  iban: 'IT12 D036 6901 6002 3614 6972 130',
  banca: 'Revolut Bank UAB',
  causale: 'Regalo di nozze Elena e Dario'
};

interface SpotifyTrack {
  id: string;
  name: string;
  artist: string;
  album: string;
  image: string;
  uri: string;
}

const Registry: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SpotifyTrack[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isAdding, setIsAdding] = useState<string | null>(null);
  const [addedTracks, setAddedTracks] = useState<Set<string>>(new Set());
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [showBankDetails, setShowBankDetails] = useState(false);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Debounced search
  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (!query.trim()) {
      setResults([]);
      return;
    }

    searchTimeoutRef.current = setTimeout(() => {
      searchTracks(query);
    }, 400);

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [query]);

  // Hide toast after 3 seconds
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Click outside to close results
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setResults([]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const searchTracks = async (searchQuery: string) => {
    setIsSearching(true);
    try {
      const response = await fetch(
        `${SUPABASE_URL}/functions/v1/search-music?query=${encodeURIComponent(searchQuery)}`,
        {
          headers: {
            'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          },
        }
      );
      
      if (!response.ok) throw new Error('Search failed');
      
      const data = await response.json();
      setResults(data.tracks || []);
    } catch (error) {
      console.error('Error searching tracks:', error);
      setResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const addTrackToPlaylist = async (track: SpotifyTrack) => {
    if (addedTracks.has(track.id)) {
      setToast({ message: 'Canzone già aggiunta!', type: 'error' });
      return;
    }

    setIsAdding(track.id);
    try {
      const response = await fetch(`${SUPABASE_URL}/functions/v1/add-track`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({ trackUri: track.uri }),
      });

      if (!response.ok) throw new Error('Failed to add track');

      setAddedTracks(prev => new Set([...prev, track.id]));
      setToast({ message: `"${track.name}" aggiunta alla playlist! 🎉`, type: 'success' });
    } catch (error) {
      console.error('Error adding track:', error);
      setToast({ message: 'Errore nell\'aggiunta. Riprova.', type: 'error' });
    } finally {
      setIsAdding(null);
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
      
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-24 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-xl shadow-lg animate-fade-in-up ${
          toast.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
        }`}>
          <p className="font-sans font-medium">{toast.message}</p>
        </div>
      )}
      
      <main className="relative z-10 flex flex-col items-center px-6 max-w-4xl mx-auto w-full">
        
        <div className="grid md:grid-cols-2 gap-16 w-full items-start">
            
            {/* Music Section - Spotify Integration */}
            <div className="flex flex-col items-center text-center md:items-start md:text-left">
                <div className="bg-[#1DB954]/10 p-5 rounded-full mb-6 inline-block">
                    <svg className="w-12 h-12 text-[#1DB954]" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                    </svg>
                </div>
                <h2 className="font-display text-5xl md:text-6xl text-secondary mb-5">Balla con Noi</h2>
                <p className="text-gray-800 font-serif mb-8 text-lg md:text-xl leading-relaxed font-medium">
                    Cerca la tua canzone preferita e aggiungila direttamente alla nostra playlist <a href="https://open.spotify.com/playlist/1Z0CK4ZxKrkmAd4Q9qSGJi?si=b4a519ad9f7f4e09" target="_blank" rel="noopener noreferrer" className="text-[#1DB954] underline">Spotify</a>!
                </p>

                {/* Search Container */}
                <div className="w-full relative" ref={containerRef}>
                    {/* Search Input */}
                    <div className="w-full relative mb-4">
                    <input 
                        type="text" 
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Cerca una canzone..." 
                        className="w-full h-16 pl-6 pr-16 rounded-2xl bg-white shadow-lg shadow-secondary/5 border border-gray-100 outline-none focus:ring-2 focus:ring-[#1DB954]/50 text-gray-800 placeholder:text-gray-400 font-sans text-lg"
                    />
                    <div className="absolute right-5 top-1/2 -translate-y-1/2">
                        {isSearching ? (
                            <span className="material-icons text-gray-400 animate-spin">autorenew</span>
                        ) : (
                            <span className="material-icons text-gray-400">search</span>
                        )}
                    </div>
                </div>
                
                {/* Search Results */}
                {results.length > 0 && (
                    <div className="w-full bg-white rounded-2xl shadow-xl border border-gray-100 max-h-[400px] overflow-y-auto">
                        {results.map((track) => (
                            <div 
                                key={track.id} 
                                className="flex items-center gap-4 p-4 border-b border-gray-100 last:border-none hover:bg-gray-50 transition-colors"
                            >
                                {track.image && (
                                    <img 
                                        src={track.image} 
                                        alt={track.album}
                                        className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                                    />
                                )}
                                <div className="flex-1 min-w-0">
                                    <p className="font-sans font-semibold text-gray-800 truncate">{track.name}</p>
                                    <p className="font-serif text-sm text-gray-500 truncate">{track.artist}</p>
                                </div>
                                <button
                                    onClick={() => addTrackToPlaylist(track)}
                                    disabled={isAdding === track.id || addedTracks.has(track.id)}
                                    className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                                        addedTracks.has(track.id) 
                                            ? 'bg-green-100 text-green-600' 
                                            : 'bg-[#1DB954] hover:bg-[#1ed760] text-white'
                                    } disabled:opacity-50`}
                                >
                                    {isAdding === track.id ? (
                                        <span className="material-icons text-xl animate-spin">autorenew</span>
                                    ) : addedTracks.has(track.id) ? (
                                        <span className="material-icons text-xl">check</span>
                                    ) : (
                                        <span className="material-icons text-xl">add</span>
                                    )}
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {/* Empty state */}
                {!query && results.length === 0 && (
                    <div className="w-full bg-white/50 rounded-2xl p-6 border border-dashed border-gray-200 text-center">
                        <span className="material-icons text-4xl text-gray-300 mb-2">queue_music</span>
                        <p className="font-serif text-gray-400">Cerca una canzone per aggiungerla alla playlist</p>
                    </div>
                )}
                </div>
            </div>

            {/* Gift Section */}
            <div className="flex flex-col items-center md:pl-12 border-t md:border-t-0 md:border-l border-primary/20 pt-12 md:pt-0">
                <div className="text-center mb-10">
                    <h2 className="font-display text-4xl md:text-5xl text-primary mb-4">Lista Nozze</h2>
                    <p className="text-gray-800 font-serif text-lg font-medium">
                        La vostra presenza è per noi il dono più prezioso. Se desiderate farci un regalo, potete scegliere liberamente un pensiero a vostra scelta oppure, se preferite, contribuire al nostro viaggio di nozze e alla futura casa insieme.
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
