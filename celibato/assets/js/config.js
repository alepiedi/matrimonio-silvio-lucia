/* ==========================================================================
   L'ULTIMA RIPETIZIONE · CONFIGURAZIONE
   Modifica solo questo file: nomi, numeri, pacchetti, date e contatti.
   I campi a null non vengono mostrati: meglio nessun numero che un numero falso.
   ========================================================================== */
window.FILM = {
  titolo: "L'Ultima Ripetizione",
  sposo: 'Silvio',
  // Come lo chiama la crew (compare nella trama e nella locandina)
  soprannome: 'il Prof',

  // Quando si gira. Lasciare generico finché non c'è la data.
  riprese: 'Primavera 2027',
  durata: '3 giorni · 2 notti',
  persone: '12–15', // quanti partecipano (serve alle location per fare i conti)

  // Entro quando chiudete gli accordi con gli sponsor (conto alla rovescia in pagina)
  chiusuraCasting: '2027-01-31T23:59:00+01:00',

  // Contatti: compilare almeno uno dei due.
  contatti: {
    email: '', // es. 'ultimaripetizione@gmail.com' (meglio un indirizzo dedicato)
    whatsapp: '', // solo cifre con prefisso, es. '393331234567'
    instagram: '', // es. 'ultimaripetizione' (senza @)
    referente: 'La Produzione',
  },

  // La crew. Nomi facoltativi: se vuoti si vede solo il ruolo.
  // "garanzia" = cosa porta questa persona allo sponsor. È il cuore del pitch.
  crew: [
    {
      ruolo: 'Lo Sposo',
      nome: 'Silvio',
      mestiere: 'Docente di scienze motorie e co-titolare di una palestra a Roma Prati',
      garanzia: 'Il protagonista. Non si tira indietro davanti a nessuna sfida fisica, ed è proprio questo il problema.',
      icona: 'kettlebell',
    },
    {
      ruolo: "L'Ingegnere",
      nome: '',
      mestiere: 'Ingegnere',
      garanzia: 'Direzione di produzione. Programma al quarto d’ora, piano B e piano C. Voi non dovrete rincorrere nessuno.',
      icona: 'compasso',
    },
    {
      ruolo: 'Il Commercialista',
      nome: '',
      mestiere: 'Commercialista',
      garanzia: 'Tesoriere. Ogni euro e ogni prodotto ricevuto viene registrato e rendicontato. Accordi scritti, niente sorprese.',
      icona: 'registro',
    },
    {
      ruolo: "L'Economista",
      nome: '',
      mestiere: 'Economista',
      garanzia: 'Box office. A fine riprese riceverete un report con visualizzazioni, interazioni e contenuti pubblicati.',
      icona: 'grafico',
    },
    {
      ruolo: 'Il Casaro',
      nome: '',
      mestiere: 'Titolare di un caseificio',
      garanzia: 'Catering di scena. Sa cosa vuol dire fare impresa e vendere un prodotto: tratterà il vostro come fosse il suo.',
      icona: 'formaggio',
    },
  ],

  // Numeri reali del pubblico. ⚠️ Lasciare null finché non li avete contati.
  // Sommate i follower di tutta la crew (Instagram + TikTok) e della palestra.
  pubblico: {
    followerCrew: null, // es. 9500
    followerPalestra: null, // es. 3200
    iscrittiPalestra: null, // es. 400
    invitatiMatrimonio: null, // es. 180
  },

  // Il matrimonio come "prima visione". ⚠️ Attivare SOLO dopo il sì di Silvio e Lucia.
  primaAlMatrimonio: false,

  // Pacchetti. "valore" è indicativo: può essere denaro, prodotti o servizi.
  pacchetti: [
    {
      id: 'produttore',
      nome: 'Produttore Esecutivo',
      posti: 1,
      valore: 'da 2.500 €',
      nota: 'in denaro o in servizi (viaggio, alloggio, attività)',
      evidenza: true,
      include: [
        'Il vostro nome nel titolo: «L’Ultima Ripetizione, presentato da…»',
        'Logo sul fronte delle magliette ufficiali della crew',
        'Il vostro marchio nel trailer, nell’aftermovie e nella locandina',
        '2 reel dedicati e storie per tutta la durata delle riprese',
        'Esclusiva di categoria: nessun concorrente nel film',
        'Diritto di usare foto e video nella vostra comunicazione',
        'Report finale con i numeri',
      ],
    },
    {
      id: 'location',
      nome: 'Location Ufficiale',
      posti: 1,
      valore: 'ospitalità',
      nota: 'alloggio e/o attività per la crew',
      evidenza: false,
      include: [
        'Il film si gira da voi: «girato a…» su trailer, locandina e titoli',
        'Riprese dedicate alla struttura (anche col drone, se permesso)',
        '1 reel «dietro le quinte» ambientato da voi',
        'Recensioni su Google e piattaforme da tutta la crew',
        'Diritto di usare foto e video nella vostra comunicazione',
        'Report finale con i numeri',
      ],
    },
    {
      id: 'placement',
      nome: 'Product Placement',
      posti: 5,
      valore: 'da 300 €',
      nota: 'anche in prodotti',
      evidenza: false,
      include: [
        'Il prodotto in scena, usato davvero (non in posa)',
        'Logo sul retro delle magliette ufficiali',
        '1 reel in cui il prodotto ha una parte',
        'Tag nelle storie durante le riprese',
        'Nome nei titoli di coda',
      ],
    },
    {
      id: 'sfida',
      nome: 'Sponsor di una Sfida',
      posti: 4,
      valore: 'da 150 €',
      nota: 'o un’esperienza offerta',
      evidenza: false,
      include: [
        'Proponete voi una prova per lo sposo (sportiva, culinaria, assurda)',
        'La sfida porta il vostro nome: «La prova di…»',
        'Video dedicato alla sfida con tag',
        'Nome nei titoli di coda',
      ],
    },
    {
      id: 'tecnico',
      nome: 'Fornitore Tecnico',
      posti: null, // null = illimitati
      valore: 'sconto o omaggio',
      nota: 'gadget, servizi, sconti',
      evidenza: false,
      include: [
        'Nome e logo nei titoli di coda',
        'Tag in una storia durante le riprese',
        'Ringraziamento sulla pagina ufficiale',
      ],
    },
  ],

  // Idee di set per chi si candida come location (solo esempi)
  set: [
    { tipo: 'Mare', idea: 'Surf, SUP o vela all’alba, poi cena di pesce. Lo sposo al timone.' },
    { tipo: 'Montagna', idea: 'Rafting, parco avventura, rifugio. Il Prof contro la natura.' },
    { tipo: 'Campagna', idea: 'Masseria o agriturismo, olimpiadi rurali, vendemmia o caseificio.' },
    { tipo: 'Città', idea: 'Caccia al tesoro urbana, rooftop, sfide a squadre tra i vicoli.' },
  ],

  // Produzione: le tappe principali
  calendario: [
    { quando: 'Ott – Dic 2026', cosa: 'Pre-produzione', dettaglio: 'Pitch agli sponsor e scelta della location' },
    { quando: '31 gen 2027', cosa: 'Chiusura casting', dettaglio: 'Accordi firmati, loghi alla stampa' },
    { quando: 'Feb – Mar 2027', cosa: 'Trailer', dettaglio: 'Uscita del teaser con i partner' },
    { quando: 'Primavera 2027', cosa: 'Riprese', dettaglio: 'L’addio al celibato, in diretta sui social' },
    { quando: '+15 giorni', cosa: 'Uscita', dettaglio: 'Aftermovie e report con i numeri a ogni partner' },
  ],

  // Cosa consegnate in ogni caso (promesse che potete mantenere)
  consegne: [
    { n: '1', cosa: 'Trailer', dettaglio: 'prima delle riprese' },
    { n: '6+', cosa: 'Reel', dettaglio: 'durante e dopo' },
    { n: '3', cosa: 'Giorni di storie', dettaglio: 'in diretta dal set' },
    { n: '1', cosa: 'Aftermovie', dettaglio: '3–5 minuti' },
    { n: '100+', cosa: 'Foto', dettaglio: 'selezionate, a vostra disposizione' },
    { n: '1', cosa: 'Report', dettaglio: 'numeri veri, entro 15 giorni' },
  ],
};
