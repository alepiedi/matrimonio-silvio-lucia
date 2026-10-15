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
  // "-" = pausa. Melodia: ritornello di "Tití Me Preguntó" (Bad Bunny), trascritto a orecchio.
  carillon: {
    attivo: true,
    note:
      // Ti-tí me pre-gun-tó / si ten-go mu-chas no-vias, mu-chas no-vias
      'E5:.5 E5:.5 E5:.5 D5:.5 C5:.5 D5:1 -:.5 ' +
      'E5:.5 E5:.5 E5:.5 D5:.5 C5:.5 D5:.5 C5:1 A4:.5 C5:.5 C5:.5 A4:1 -:.5 ' +
      // hoy ten-go a u-na, ma-ña-na o-tra / pe-ro no hay bo-da
      'E5:.5 E5:.5 E5:.5 D5:.5 C5:1 D5:.5 D5:.5 E5:.5 D5:.5 C5:1 ' +
      'A4:.5 C5:.5 D5:.5 E5:.5 D5:1 C5:1.5 -:1.5',
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
