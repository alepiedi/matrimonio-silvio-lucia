/* ==========================================================================
   CONFIGURAZIONE DEL SITO
   Modifica solo questo file per cambiare nomi, data, luogo, foto e RSVP.
   ========================================================================== */
window.WEDDING = {
  lui: 'Silvio',
  lei: 'Lucia',

  // Data del matrimonio (anno-mese-giorno)
  data: '2027-07-17',
  // Orario della cerimonia, es. '16:30'. Vuoto = non viene mostrato
  // (e in calendario l'evento dura tutto il giorno).
  orario: '17:30',
  durataOre: 10, // durata dell'evento in calendario, solo se c'è l'orario

  luogo: {
    nome: 'Le Case Gialle',
    breve: 'Case Gialle', // quello che compare nel bollino del gratta e vinci
    citta: 'Melizzano',
    indirizzo: 'Melizzano (BN)',
    maps: 'https://www.google.com/maps/search/?api=1&query=Le+Case+Gialle+Melizzano',
  },

  rsvp: {
    entro: '', // data limite per rispondere, es. '2027-03-31'. Vuoto = nessuna scadenza
    // Dove arrivano le risposte (vedi README):
    //  - URL Formspree, es. 'https://formspree.io/f/abcdwxyz'
    //  - oppure URL di uno script Google (risposte in un Foglio Google)
    endpoint: 'https://script.google.com/macros/s/AKfycby6fxCjj7KDb2L_hoBZQtLxvL-ziV8XD9g_8pcaHFuyJYeIx3kE9LmkcH8T5a26oR2m/exec',
    // Se endpoint è vuoto, la risposta viene preparata come email a questo indirizzo
    email: '',
  },

  // Caccia a Charlino: si sblocca trovando il gatto nei suoi tre nascondigli
  charlino: {
    messaggio: 'Charlino non si fa trovare da tutti: se ci sei riuscito, vuol dire che ci conosci davvero bene.',
    premio: 'Al matrimonio cerca Silvio e Lucia e di’ la parola d’ordine «Charlino»: c’è un brindisi speciale per te.',
  },

  // Carillon: suona mentre si scorre. Note nel formato NOTA:durata (in battiti), separate da spazi.
  // "-" = pausa. Melodia: ritornello di "Annarè" (Gigi D'Alessio), preso dalla traccia
  // della voce di un file MIDI e portato un'ottava sopra, in La bemolle maggiore.
  carillon: {
    attivo: true,
    note:
      'C5:1.25 C5:0.5 C5:1 C5:1 C5:1.25 Db5:2 Db5:1 C5:1.25 Ab4:2 Bb4:1.25 C5:3 C5:1 ' +
      'C5:1.25 C5:0.5 C5:1 C5:0.75 C5:1 Db5:3 Eb5:1 Ab4:1.75 Bb4:1 C5:3.25 C5:1 C5:1.25 ' +
      'C5:0.75 C5:1 C5:0.75 C5:1 Bb4:3 C5:1.25 Bb4:1.75 G4:1.25 Ab4:3 Ab4:3 -:1 F5:1.25 ' +
      'F5:0.5 F5:1 F5:1 F5:1 Eb5:2.75 F5:1.25 Eb5:2 Db5:2 C5:3.25 C5:1.25 C5:0.75 C5:1 ' +
      'C5:1 Db5:1 Eb5:1.75 Bb4:1.5 C5:0.5 Bb4:0.25 Ab4:3 -:1 Ab4:1.25 Ab4:0.5 Ab4:1 Ab4:1 ' +
      'Ab4:1 C5:2 Bb4:1 Ab4:1 C5:2 Bb4:1 C5:0.5 Bb4:0.5 Ab4:3 -:2',
  },

  // Foto appese al filo rosso (consigliato: 6–8 foto verticali, ~1000px di lato lungo)
  foto: [
    { src: 'assets/img/photos/01-prime-foto-2019.jpg', didascalia: 'Una delle prime, 2019' },
    { src: 'assets/img/photos/02-primo-viaggio.jpg', didascalia: 'Il primo viaggio' },
    { src: 'assets/img/photos/03-i-nostri-viaggi.jpg', didascalia: 'I nostri viaggi' },
    { src: 'assets/img/photos/04-al-mare.jpg', didascalia: 'Al mare' },
    { src: 'assets/img/photos/05-casa-nostra.jpg', didascalia: 'Casa nostra' },
    { src: 'assets/img/photos/06-con-charlino.jpg', didascalia: 'Con Charlino' },
    { src: 'assets/img/photos/07-il-si.jpg', didascalia: 'Il sì' },
  ],
};
