import React from 'react';

const Registry: React.FC = () => {
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
                        placeholder="Artista - Titolo Canzone" 
                        className="w-full h-16 pl-6 pr-16 rounded-2xl bg-white shadow-lg shadow-secondary/5 border border-gray-100 outline-none focus:ring-2 focus:ring-secondary/50 text-gray-800 placeholder:text-gray-400 font-sans text-lg"
                    />
                    <button className="absolute right-3 top-3 bottom-3 w-12 bg-secondary hover:bg-primary text-white rounded-xl flex items-center justify-center transition-colors shadow-md">
                        <span className="material-icons text-2xl">add</span>
                    </button>
                </div>
                
                <div className="space-y-3 w-full opacity-90">
                     <div className="flex items-center gap-3 bg-white/80 p-3 rounded-lg border border-gray-100 shadow-sm">
                        <span className="material-icons text-gray-400 text-base">history</span>
                        <span className="text-sm text-gray-600 font-medium">Dancing Queen - ABBA</span>
                     </div>
                     <div className="flex items-center gap-3 bg-white/80 p-3 rounded-lg border border-gray-100 shadow-sm">
                        <span className="material-icons text-gray-400 text-base">history</span>
                        <span className="text-sm text-gray-600 font-medium">September - Earth, Wind & Fire</span>
                     </div>
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

                <div className="grid grid-cols-2 gap-4 w-full">
                    {[
                        { icon: 'flight_takeoff', label: 'Luna di Miele', color: 'text-blue-600', bg: 'bg-blue-50' },
                        { icon: 'cottage', label: 'Casa Nuova', color: 'text-orange-600', bg: 'bg-orange-50' },
                        { icon: 'kitchen', label: 'Arredamento', color: 'text-yellow-700', bg: 'bg-yellow-50' },
                        { icon: 'volunteer_activism', label: 'Beneficenza', color: 'text-green-600', bg: 'bg-green-50' }
                    ].map((item) => (
                        <button key={item.label} className="group flex flex-col items-center justify-center bg-white p-6 rounded-3xl shadow-md border border-gray-100 hover:border-primary/50 hover:shadow-xl transition-all aspect-square">
                            <div className={`${item.bg} ${item.color} p-5 rounded-full mb-3 group-hover:scale-110 transition-transform`}>
                            <span className="material-icons text-4xl">{item.icon}</span>
                            </div>
                            <span className="font-bold text-secondary text-base">{item.label}</span>
                        </button>
                    ))}
                </div>
            </div>

        </div>
      </main>
    </div>
  );
};

export default Registry;