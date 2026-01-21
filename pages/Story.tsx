import React from 'react';

const Story: React.FC = () => {
  return (
    <div className="bg-paper text-secondary min-h-screen flex items-center justify-center py-20 relative overflow-hidden">
      
      {/* Decorative Background Image */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
         <img 
           src="https://lh3.googleusercontent.com/aida-public/AB6AXuCOeyc-DlDTXadZq1uGQCp0S28L7GQaxwRH01zBdjhi5vobRIxTsl5_TXFQIGvF2zhqeW-92TFeCuI4RU6s-5XmoE4I4FWb3IYrkxvZzvexiuQ1iAqbakFEY-gLD8KQSqKHs18TJZbUSQ8Y-xxeXFKz36NLn1v80ntcIgRD0ze-u4IbsFlxtG17An8rQJgf4_9Lv66xISlyExk7hgBm2OAjlgL9cdNM4JiBkLw_3ttflT6VwhcFcDu_E6XflLfHXAuQxKb7Nx4RQ7Tz" 
           alt="Silhouette"
           className="w-full h-full object-cover illustration-filter mask-image-linear"
         />
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-10 w-full">
        <div className="text-center mb-16">
          <h2 className="font-display text-6xl md:text-7xl text-primary mb-6">La Nostra Storia</h2>
          <p className="font-serif text-2xl italic text-gray-700 font-medium">Tre momenti che hanno cambiato tutto.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Milestone 1 */}
          <div className="bg-white p-8 md:p-10 rounded-t-full rounded-b-3xl shadow-xl border-b-4 border-primary/20 text-center transform hover:-translate-y-2 transition-transform duration-500 group">
            <div className="w-24 h-24 bg-tertiary/20 rounded-full mx-auto mb-6 flex items-center justify-center group-hover:bg-tertiary/30 transition-colors">
              <span className="font-display text-4xl text-secondary">2018</span>
            </div>
            <h3 className="font-serif text-3xl font-bold text-secondary mb-4">L'Amicizia</h3>
            <p className="text-gray-800 leading-relaxed text-lg font-medium">
              Le nostre strade si sono incrociate all'università, grazie a un sorteggio e a un esame che ci ha resi amici.     
              </p>
          </div>

          {/* Milestone 2 */}
          <div className="bg-white p-8 md:p-10 rounded-t-full rounded-b-3xl shadow-xl border-b-4 border-primary/40 text-center transform translate-y-0 md:translate-y-12 hover:translate-y-10 transition-transform duration-500 group">
            <div className="w-24 h-24 bg-primary/10 rounded-full mx-auto mb-6 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <span className="font-display text-4xl text-primary">2021</span>
            </div>
            <h3 className="font-serif text-3xl font-bold text-secondary mb-4">L'Amore</h3>
            <p className="text-gray-800 leading-relaxed text-lg font-medium">
              Anni dopo, sullo sfondo delle montagne trentine, quell'amicizia si è trasformata in amore.
            </p>
          </div>

          {/* Milestone 3 */}
          <div className="bg-white p-8 md:p-10 rounded-t-full rounded-b-3xl shadow-xl border-b-4 border-primary text-center transform hover:-translate-y-2 transition-transform duration-500 group">
            <div className="w-24 h-24 bg-secondary/10 rounded-full mx-auto mb-6 flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
              <span className="font-display text-4xl text-secondary">2026</span>
            </div>
            <h3 className="font-serif text-3xl font-bold text-secondary mb-4">Il Per Sempre</h3>
            <p className="text-gray-800 leading-relaxed text-lg font-medium">
              Il 30 Maggio 2026, vi invitiamo a festeggiare con noi e celebrare il prossimo capitolo di questa storia.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Story;