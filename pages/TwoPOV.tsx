import React, { useState } from 'react';

interface CardData {
  title: string;
  photoUrl: string;
  lui: string;
  lei: string;
}

const cards: CardData[] = [
  {
    title: 'Pianificazione finanziaria',
    photoUrl: 'https://hujhpdqrsrldaulwisoq.supabase.co/storage/v1/object/public/wedding-photos/Pianificazione%20Finanziaria.jpg',
    lui: `Se c'è una sliding door in questa storia, direi che è proprio questa. \nCome poteva il destino giocarsi così bene le sue carte, mettendo nella stessa mano quelle giuste?`,
    lei: `Pensavo "Cambio corso di studio per fare più esami di statistica ed evitare storia economica".\n In realtà, peggio di storia economica, c'era questo mattone di contabilità da 18 crediti.\n Quella svista non poteva essere un caso.`,
  },
  {
    title: 'Casa Science',
    photoUrl: 'https://hujhpdqrsrldaulwisoq.supabase.co/storage/v1/object/public/wedding-photos/Casa%20Science.jpg',
    lui: `Casa è casa. Casa è dove ti senti accolto. In quei momenti di pandemia, stare bene non era cosa da poco.\nIo in quella casa però accoglievo una persona che non riuscivo a smettere di guardare.`,
    lei: `Lì stavo bene. Le lezioni seguite in soggiorno invece che in aula. Un otium letterario a tema data science.\nPiano piano, in quella casa mi sentivo attratta come da una calamita e finivo sempre più vicina a lui.`,
  },
  {
    title: 'Scampagnate',
    photoUrl: 'https://hujhpdqrsrldaulwisoq.supabase.co/storage/v1/object/public/wedding-photos/bosco%20della%20citta.jpg',
    lui: `Brevi mattinate. Lunghi sentieri.\n All'inizio inaspettati, poi così attesi. I primi momenti passati solo io e lei.`,
    lei: `"Ragazzi, domattina sveglia presto e andiamo a fare una passeggiata. Ci godiamo questa zona gialla finché dura!"\n L'indomani tutto taceva. L'unico a svegliarsi era sempre lui. Passeggiate lente, a chiacchierare del più e del meno.\nEra bello uscire a camminare, ma con lui lo era un po' di più.`,
  },
  {
    title: 'Esame sul cinema indipendente',
    photoUrl: 'https://hujhpdqrsrldaulwisoq.supabase.co/storage/v1/object/public/wedding-photos/Esame%20sul%20cinema%20indipendente.jpg',
    lui: `La magia del cinema! Ci voleva proprio quella… e un po' di analisi.\n Mi ricordo di quando mi ha lasciato intervistare da solo tutta la fila di persone intente a entrare in biblioteca.\n Faceva freddo.\n  Ma i dati servivano.`,
    lei: `Un progetto di idee folli e ambiziose.\n Infine, in una piovosa sera di gennaio, le nostre dita si sfiorano, una scintilla… e il resto è storia.`,
  },
  {
    title: 'Proiettore',
    photoUrl: 'https://hujhpdqrsrldaulwisoq.supabase.co/storage/v1/object/public/wedding-photos/Proiettore.jpg',
    lui: `Lo chiamavano l'improvvisatore.\n Dovevo assolutamente giocarmi qualcosa — non sapevo cosa… \n Ah sì, un biglietto.\n Ma dove? Il proiettore!\n Ma dove!? Nel vano tra la lente e la chiusura. \n Che lampo di genio!`,
    lei: `Torno a casa per le vacanze di Natale, accendo il proiettore per iniziare i miei giorni di isolamento con una lista infinita di film.\n Ma… perché la luce non funziona?\n Ed era proprio lì la causa: un bigliettino.\n Non sarà mica che lui provi qualcosa per me?`,
  },
  {
    title: 'Manicotto',
    photoUrl: 'https://hujhpdqrsrldaulwisoq.supabase.co/storage/v1/object/public/wedding-photos/Manicotto.jpg',
    lui: `Un piccolo regalo fatto a maglia. Per avvicinarci, per avere la scusa di farle capire quanto fosse importante per me.`,
    lei: `Singolare che lavori a maglia.\n Chi l'avrebbe mai detto che l'avrebbe usata come scusa per avvicinarmi.`,
  },
  {
    title: 'Paperinik',
    photoUrl: 'https://hujhpdqrsrldaulwisoq.supabase.co/storage/v1/object/public/wedding-photos/Paperinik.jpg',
    lui: `Galeotto fu quel papero!\n Un papero mascherato che adoravamo entrambi ci ha portato al regalo più insolito che abbia mai fatto.`,
    lei: `Tendo a emozionarmi per poco ma, credetemi, la barca di Paperinik che può navigare i laghi del Trentino, per me non è affatto poco!`,
  },
  {
    title: 'The first song is f****** epic',
    photoUrl: 'https://hujhpdqrsrldaulwisoq.supabase.co/storage/v1/object/public/wedding-photos/The%20first%20song%20is.jpg',
    lui: `Facciamole una playlist. Alternativa. Diversa. La colpirò.\n Mettiamoci una canzone giapponese indie. Forse sarà lei che colpirà me.\n Sì, con una padella.`,
    lei: `Gli ho chiesto di condividere una playlist per conoscerci meglio e per sentirci vicini finché eravamo distanti. Lui in camera sua, io in casa mia. La sua playlist arriva dopo qualche ora. Click, play. Non avevo mai sentito indie giapponese.`,
  },
  {
    title: 'Pringles alla paprika (bonus track)',
    photoUrl: 'https://hujhpdqrsrldaulwisoq.supabase.co/storage/v1/object/public/wedding-photos/Pringles.jpg',
    lui: `L'improvvisatore è tornato! Manca poco, sta per prendere il treno.\n Un gesto. Uno! \n Un biglietto. Sì, di nuovo. \n Ma dove? Le Pringles! \n Sì, ma dove!? Dentro? Mmm, mettiamolo attaccato sotto.\n Signori, in qualche modo è andata.`,
    lei: `In quei mesi avevo una grande ossessione: le Pringles alla paprika.\n Eppure, quel tubo regalato prima che prendessi il treno per tornare a casa, non era come tutti gli altri.`,
  },
  {
    title: 'Old Boy',
    photoUrl: 'https://hujhpdqrsrldaulwisoq.supabase.co/storage/v1/object/public/wedding-photos/Old%20Boy.jpg',
    lui: `Io volevo andare a vedere un altro film. Eppure questo è stato il primo.\n Romantico? No.\n Bello? Sì.\n Volevo vederlo? Con lei andava bene tutto.`,
    lei: `Che bello, i cinema hanno riaperto! Vestita carina, mi preparo al primo film in sala insieme. \n "Dario, dove ceniamo?" "Kebab della stazione."\n "Ok. E che film?" "Sorpresa!" \n Pensavo fosse tutto studiato, invece, in fondo, ci siamo sorpresi entrambi. \n Cruentemente.`,
  },
  {
    title: 'Ferragosto toscano',
    photoUrl: 'https://hujhpdqrsrldaulwisoq.supabase.co/storage/v1/object/public/wedding-photos/Ferragosto%20Toscano.jpg',
    lui: `Improvvisando si sbaglia.\n Se doveste avere una macchina del tempo, no.\n Scegliete il Ferragosto 2021: vedreste una ragazza abituata a lussureggianti banchetti estivi con un kebab in mano davanti alla stazione.\n  Che ce potevo fa'.`,
    lei: `Era troppo presto per portarlo a Pisciotta, ma non abbastanza per raggiungerlo in Toscana.\n Ho capito la follia della scelta quando mi ritrovo a vagare per Firenze Santa Maria Novella con un trolley e 40 gradi all'ombra.\n Però quanto buona era quella schiacciata!`,
  },
  {
    title: 'Regali',
    photoUrl: 'https://hujhpdqrsrldaulwisoq.supabase.co/storage/v1/object/public/wedding-photos/Slam%20dunk.jpg',
    lui: `Se so qualcosa di lei è che è una bugiarda. Le cresce il naso come a Pinocchio.\n Non so fare i regali, diceva.\n Eppure un regalo così bello non l'ho mai ricevuto.`,
    lei: `Doveva essere un libro sulla chimica dei funghi, ma due giorni prima di vederci per Natale decido che non fosse abbastanza.\n Dopo un pomeriggio di telefonate a tutti i Comics tra Salerno e Napoli, trovo quelle illustrazioni!\n Lui contento, io ancora penso che è solo la seconda ristampa.`,
  },
  {
    title: 'Bali, non Bari',
    photoUrl: 'https://hujhpdqrsrldaulwisoq.supabase.co/storage/v1/object/public/wedding-photos/Bali,%20non%20bari.jpg',
    lui: `Scappando a mezzanotte dall'hotel in cui alloggiavamo, per timore di chissà quale sorpresa al mattino.\n Lì ho capito che avevo una persona a cui tenevo che andava protetta.`,
    lei: `C'è chi dice che per capire se sei con la persona giusta bisogna fare un Cammino di Santiago.\n Io dico che un viaggio in Indonesia, come primo fuori dall'Europa, sia l'ideale: se dopo un cocktail di jet lag, digiuni, templi all'alba e scimmiette per strada siete ancora insieme, probabilmente siete con la persona giusta.`,
  },
  {
    title: 'Le Albere',
    photoUrl: 'https://hujhpdqrsrldaulwisoq.supabase.co/storage/v1/object/public/wedding-photos/Le%20Albere.jpg',
    lui: `Adesso? No, adesso no.\n Adesso? No, non voglio fare lo show davanti a tutti.\n Sta uscendo dal bagno… Adesso? No dai, qualcosa di più romantico.\n Dario è l'ultimo giorno!\n Hei.. ma si è svegliata presto di domenica, invitiamola a fare una passeggiata.\n L'unico in giro è un tizio in bici. \nSiamo noi due. \n Ma che fa, guarda un tronco di sotto al ponte. Topo morto? \n Vabbé facciamo Adesso.`,
    lei: `Il sentore c'era.\n Mi aveva strappato di mano il portafoglio prima che potessi vedere di cosa fosse quello scontrino. \n Cosa mi nascondeva?\n Dopo mesi di attesa e di domande, dopo un bellissimo weekend di musica e amici, con lo scorrere dell'Adige e lo sfondo delle montagne trentine, c'era lui. \n In ginocchio e con un anello.\n Proprio quell'anello che, oggi, ci ha portati qui.`,
  },
];

// Subtle alternating rotations for natural Polaroid scatter effect
const rotations = [
  'rotate-1', '-rotate-1', 'rotate-2', '-rotate-2', 'rotate-0',
  '-rotate-1', 'rotate-1', '-rotate-2', 'rotate-2', 'rotate-0',
  'rotate-1', '-rotate-1', 'rotate-2', '-rotate-1',
];

interface PolaroidCardProps {
  card: CardData;
  index: number;
}

const PolaroidCard: React.FC<PolaroidCardProps> = ({ card, index }) => {
  const [flipped, setFlipped] = useState(false);
  const rotation = rotations[index] ?? 'rotate-0';

  return (
    <div
      className={`cursor-pointer transition-transform duration-300 hover:scale-[1.03] hover:rotate-0 ${rotation}`}
      style={{ perspective: '1200px' }}
      onClick={() => setFlipped(f => !f)}
      title={flipped ? 'Clicca per tornare alla foto' : 'Clicca per leggere la storia'}
    >
      {/*
        Flip wrapper:
        - position: relative → il FRONTE (flusso normale) determina l'altezza del contenitore
        - il RETRO è position: absolute che si sovrappone esattamente al fronte
        - così non c'è spazio bianco sul fronte anche se il retro ha più testo
      */}
      <div
        style={{
          position: 'relative',
          transformStyle: 'preserve-3d',
          transition: 'transform 0.7s cubic-bezier(0.4, 0.2, 0.2, 1)',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* ─── FRONT — flusso normale, determina altezza ─── */}
        <div
          style={{ backfaceVisibility: 'hidden' }}
          className="bg-white shadow-xl p-3"
        >
          {/* Photo area */}
          {card.photoUrl ? (
            <img
              src={card.photoUrl}
              alt={card.title}
              className="w-full aspect-square object-cover"
            />
          ) : (
            <div className="w-full aspect-square bg-gradient-to-br from-secondary/10 to-primary/10 flex flex-col items-center justify-center gap-2">
              <span className="material-icons-outlined text-5xl text-primary/30">photo_camera</span>
              <span className="text-[10px] uppercase tracking-widest text-primary/30 font-sans">foto in arrivo</span>
            </div>
          )}

          {/* Caption */}
          <div className="pt-3 pb-5 px-1 flex items-center justify-between">
            <p className="font-serif italic text-secondary text-xl leading-snug flex-1 pr-2">
              {card.title}
            </p>
            <span className="material-icons-outlined text-base text-primary/30 flex-shrink-0">flip</span>
          </div>
        </div>

        {/* ─── BACK — absolute overlay, scorre se il testo è lungo ─── */}
        <div
          style={{
            backfaceVisibility: 'hidden',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            transform: 'rotateY(180deg)',
          }}
        >
          {/* Contenitore interno scrollabile — non tocca il preserve-3d parent */}
          <div
            className="bg-white shadow-xl p-5 flex flex-col h-full overflow-y-auto"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            <p className="text-[10px] text-center uppercase tracking-[0.25em] text-primary/50 mb-4 font-sans flex-shrink-0">
              — {card.title} —
            </p>

            {/* Lui */}
            <div className="mb-3 flex-shrink-0">
              <p className="font-sans text-[11px] uppercase tracking-widest text-secondary font-bold mb-1.5">
                🎩 Lui
              </p>
              <p className="font-serif text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                {card.lui}
              </p>
            </div>

            <div className="w-full h-px bg-primary/20 my-2 flex-shrink-0" />

            {/* Lei */}
            <div className="mt-3 flex-shrink-0">
              <p className="font-sans text-[11px] uppercase tracking-widest text-primary font-bold mb-1.5">
                💍 Lei
              </p>
              <p className="font-serif text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                {card.lei}
              </p>
            </div>

            {/* Footer hint — clicca sulla zona FUORI dal testo scorrevole per tornare */}
            <p className="text-center text-primary/25 mt-5 text-[10px] font-sans tracking-widest uppercase flex-shrink-0">
              ↩ tocca fuori per tornare
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const TwoPOV: React.FC = () => {
  return (
    <div className="bg-background min-h-screen py-24 relative overflow-hidden">
      {/* Decorative top border */}
      <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section header */}
        <div className="text-center animate-fade-in-up mb-16">
          <span className="block text-primary font-bold tracking-[0.3em] uppercase text-base mb-4">
            IL NOSTRO TABLEAU DE MARIAGE
          </span>
          <h2
            className="text-secondary font-display mb-6"
            style={{ fontSize: 'clamp(2.8rem, 7vw, 4.5rem)', lineHeight: 1.15 }}
          >
            Una storia,<br className="hidden sm:block" /> due punti di vista
          </h2>
          <p className="text-gray-600 font-serif text-xl max-w-2xl mx-auto">
            Ogni tavolo del nostro ricevimento raccontava un momento della nostra storia.
            Clicca su una foto per scoprire come lo abbiamo vissuto ciascuno.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
          {cards.map((card, index) => (
            <PolaroidCard key={card.title} card={card} index={index} />
          ))}
        </div>
      </div>

      {/* Background decor */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl -translate-x-1/2" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl translate-x-1/3" />
      </div>
    </div>
  );
};

export default TwoPOV;
