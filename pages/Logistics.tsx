import React from 'react';

const InfoCard = ({ icon, title, children }: { icon: string, title: string, children?: React.ReactNode }) => (
  <div className="bg-white p-6 sm:p-8 md:p-10 rounded-3xl shadow-lg border border-primary/10 hover:shadow-xl transition-shadow duration-300">
    <div className="flex flex-wrap md:flex-nowrap items-start gap-4 sm:gap-5 mb-8">
      <div className="w-12 h-12 sm:w-14 sm:h-14 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
        <span className="material-icons text-primary text-2xl sm:text-3xl">{icon}</span>
      </div>
      <h3 className="font-display text-4xl sm:text-5xl leading-tight text-secondary break-words flex-1">{title}</h3>
    </div>
    <div className="text-gray-800 font-serif leading-relaxed space-y-5 text-lg sm:text-xl font-medium">
      {children}
    </div>
  </div>
);

const Logistics: React.FC = () => {
  return (
    <div className="bg-paper min-h-screen py-24 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(#2C5F6D 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
           <span className="text-primary font-bold tracking-[0.3em] uppercase text-base mb-3 block">Informazioni Utili</span>
           <h2 className="text-7xl md:text-8xl text-secondary font-display mb-6">Info & Logistica</h2>
           <p className="text-gray-700 font-serif max-w-2xl mx-auto text-2xl font-medium">Tutto quello che c'è da sapere per raggiungere la location e godersi la festa.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Transport */}
          <InfoCard icon="directions_car" title="Come Arrivare">
             <div className="space-y-6">
                <div>
                  <h4 className="font-bold text-secondary uppercase text-base tracking-wide mb-2 flex items-center gap-2">
                    <span className="material-icons text-lg">train</span> In Treno (Consigliato)
                  </h4>
                  <p>Arrivati a Salerno, i treni regionali raggiungono in 1h30-2h la stazione di <strong>"Pisciotta-Palinuro"</strong>.</p>
                </div>

                <div>
                   <h4 className="font-bold text-secondary uppercase text-base tracking-wide mb-2 flex items-center gap-2">
                    <span className="material-icons text-lg">commute</span> Navetta Gratuita
                  </h4>
                  <p>Prevediamo un servizio navetta per le tratte:</p>
                  <ul className="list-disc list-inside pl-2 text-lg space-y-2 mt-2 opacity-90">
                    <li>Stazione → Hotel</li>
                    <li>Hotel → Chiesa → Ricevimento</li>
                    <li>Ricevimento → Hotel</li>
                  </ul>
                </div>

                <div className="bg-orange-50 p-5 rounded-xl border border-orange-200 text-lg">
                   <h4 className="font-bold text-orange-800 uppercase text-sm tracking-wide mb-2 flex items-center gap-2">
                    <span className="material-icons text-lg">warning</span> Attenzione Auto
                  </h4>
                  <p className="text-gray-800">Google Maps potrebbe suggerire strade provinciali accidentate.</p>
                  <p className="mt-2 font-bold text-gray-800">Itinerario consigliato:</p>
                  <ol className="list-decimal list-inside pl-1 mt-1 text-gray-800">
                    <li>Inserire destinazione <strong>Palinuro</strong>.</li>
                    <li>Arrivati a Palinuro, inserire <strong>Marina di Pisciotta</strong>.</li>
                  </ol>
                </div>
             </div>
          </InfoCard>

          {/* Accommodation */}
          <InfoCard icon="hotel" title="Pernottamento">
            <div className="space-y-4">
              <p><strong>Villaggio Club "La Marée"</strong>.</p>
              
              <div className="bg-primary/10 p-5 rounded-xl border border-primary/30">
                <h4 className="font-bold text-primary text-lg mb-1">🎁 Notte del 30 Maggio</h4>
                <p className="text-secondary font-bold text-lg italic">Offerta da noi!</p>
                <p className="mt-1 text-gray-900">La notte dell'evento è un nostro regalo per tutti gli ospiti.</p>
              </div>

              <div>
                <h4 className="font-bold text-secondary uppercase text-base tracking-wide mb-2">Notti Aggiuntive</h4>
                <p className="mb-2">Tariffe agevolate in pensione completa (inclusa navetta stazione):</p>
                <ul className="space-y-3 mt-3">
                  <li className="flex justify-between border-b border-gray-200 pb-2">
                    <span>Camera doppia</span>
                    <span className="font-bold text-secondary">50€ p.p./notte</span>
                  </li>
                  <li className="flex justify-between border-b border-gray-200 pb-2">
                    <span>3°, 4°, 5° letto</span>
                    <span className="font-bold text-secondary">30€ p.p./notte</span>
                  </li>
                </ul>
                <p className="text-lg text-gray-600 mt-4 italic">Il villaggio offre piscina, spiaggia, animazione e aree relax.</p>
              </div>
            </div>
          </InfoCard>

          {/* Tips */}
          <div className="md:col-span-2">
            <InfoCard icon="wb_sunny" title="Cosa Portare">
              <div className="flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left text-xl md:text-2xl">
                <div className="flex-1">
                   <p className="mb-4 font-medium text-lg">Il ricevimento si svolgerà (incrociamo le dita) in gran parte all'aperto.</p>
                   <ul className="space-y-4">
                     <li className="flex items-center gap-4 justify-center md:justify-start">
                        <span className="material-icons text-tertiary text-3xl">checkroom</span>
                        <span className="text-lg">La cena sarà all'aperto - consigliato abbigliamento adatto alle temperature serali</span>
                     </li>
                    <li className="flex items-center gap-4 justify-center md:justify-start">
                      <span className="material-icons text-tertiary text-3xl">nightlife</span>
                      <span className="text-lg">Il DJ non avrà pietà - scarpe comode consigliate</span>
                    </li>
                   </ul>
                </div>
              </div>
            </InfoCard>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Logistics;