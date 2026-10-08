/* ==========================================================================
   CONFIGURAZIONE DEL SITO
   Modifica solo questo file per cambiare nomi, data, luogo, foto e RSVP.
   ========================================================================== */
window.WEDDING = {
  lui: 'Silvio',
  lei: 'Lucia',

  // Data e ora della cerimonia, in ora italiana (+02:00 = ora legale estiva).
  // ⚠️ L'orario 16:30 è ancora da confermare.
  data: '2027-07-17T16:30:00+02:00',
  durataOre: 10, // usata per l'evento in calendario

  luogo: {
    // Cartolina: frase piccola in corsivo + scritta gigante (ogni parola va su una riga)
    salutiDa: 'Saluti dalle',
    saluti: 'Case Gialle',
    nome: 'Le Case Gialle',
    // ⚠️ Indirizzo e link Maps ancora da confermare
    indirizzo: 'Indirizzo da confermare',
    maps: 'https://www.google.com/maps/search/?api=1&query=Le+Case+Gialle',
    // Immagine che riempie le lettere della cartolina (panorama del luogo)
    foto: 'assets/img/luogo.svg',
  },

  rsvp: {
    entro: '2027-03-31', // data limite per rispondere
    // Dove arrivano le risposte (vedi README):
    //  - URL Formspree, es. 'https://formspree.io/f/abcdwxyz'
    //  - oppure URL di uno script Google (risposte in un Foglio Google)
    endpoint: '',
    // Se endpoint è vuoto, la risposta viene preparata come email a questo indirizzo
    email: '',
  },

  // Foto appese al filo rosso (consigliato: 6–8 foto verticali, ~1000px di lato lungo)
  foto: [
    { src: 'assets/img/photos/foto-1.svg', didascalia: 'Il primo incontro' },
    { src: 'assets/img/photos/foto-2.svg', didascalia: 'Il primo viaggio' },
    { src: 'assets/img/photos/foto-3.svg', didascalia: 'Casa nostra' },
    { src: 'assets/img/photos/foto-4.svg', didascalia: 'Quella volta al mare' },
    { src: 'assets/img/photos/foto-5.svg', didascalia: 'Il sì' },
    { src: 'assets/img/photos/foto-6.svg', didascalia: 'Prossimamente…' },
  ],
};
