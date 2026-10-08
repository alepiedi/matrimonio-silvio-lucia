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
  orario: '',
  durataOre: 10, // durata dell'evento in calendario, solo se c'è l'orario

  luogo: {
    // Cartolina: frase piccola in corsivo + scritta gigante (ogni parola va su una riga)
    salutiDa: 'Saluti dalle',
    saluti: 'Case Gialle',
    nome: 'Le Case Gialle',
    citta: 'Melizzano',
    indirizzo: 'Melizzano (BN)',
    maps: 'https://www.google.com/maps/search/?api=1&query=Le+Case+Gialle+Melizzano',
    // Immagine che riempie le lettere della cartolina (panorama del luogo)
    foto: 'assets/img/luogo.svg',
  },

  rsvp: {
    entro: '', // data limite per rispondere, es. '2027-03-31'. Vuoto = nessuna scadenza
    // Dove arrivano le risposte (vedi README):
    //  - URL Formspree, es. 'https://formspree.io/f/abcdwxyz'
    //  - oppure URL di uno script Google (risposte in un Foglio Google)
    endpoint: '',
    // Se endpoint è vuoto, la risposta viene preparata come email a questo indirizzo
    email: '',
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
