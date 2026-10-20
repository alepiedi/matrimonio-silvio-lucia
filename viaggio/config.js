/* ==========================================================================
   PAGINA DEL REGALO — "Il nostro viaggio di nozze in Giappone"
   Modifica solo questo file per cambiare IBAN, intestatari e tappe.
   ========================================================================== */
window.VIAGGIO = {
  sposi: 'Silvio & Lucia',

  // ⚠️ SEGNAPOSTO: inserire i dati veri prima di stampare il QR code
  iban: 'IT00 X000 0000 0000 0000 0000 000',
  intestatario: 'Silvio … e Lucia …',
  banca: '', // facoltativo, es. 'Banca XYZ'

  // Le tappe sulla mappa (l'ordine è quello dei numeri). lat/lon = posizione vera;
  // pos = dove mettere il cerchio numerato nel disegno 1000×1150 (spostato in mare se le tappe sono vicine,
  // una linea sottile lo collega al punto vero); etichetta = dove compare il nome quando la tappa è scelta
  // (n, s, e, o). testo = due righe di sogno; esperienza = cosa "regalano" gli invitati.
  tappe: [
    {
      id: 'sapporo', nome: 'Hokkaido', kanji: '北海道', lat: 43.06, lon: 141.35, pos: [706, 257], etichetta: 'o',
      testo: 'A luglio i campi di lavanda sono in fiore. Ramen al miso a Sapporo e un tramonto sul lago.',
      esperienza: 'Un ramen al miso a Sapporo',
    },
    {
      id: 'tokyo', nome: 'Tokyo', kanji: '東京', lat: 35.68, lon: 139.69, pos: [725, 790], etichetta: 's',
      testo: 'Le luci di Shibuya, il sushi all’alba al mercato e un karaoke a cui non sapremo dire di no.',
      esperienza: 'Una cena di sushi a Tokyo',
    },
    {
      id: 'fuji', nome: 'Monte Fuji', kanji: '富士山', lat: 35.36, lon: 138.73, pos: [620, 925], etichetta: 's',
      testo: 'Una notte in un ryokan con l’onsen, il kimono e il Fuji che compare dalle nuvole al mattino.',
      esperienza: 'Una notte in ryokan sotto il Fuji',
    },
    {
      id: 'kanazawa', nome: 'Kanazawa', kanji: '金沢', lat: 36.56, lon: 136.66, pos: [375, 645], etichetta: 'n',
      testo: 'Il giardino Kenroku-en, le case delle geishe e il gelato ricoperto di foglia d’oro.',
      esperienza: 'Un gelato d’oro a Kanazawa',
    },
    {
      id: 'takayama', nome: 'Takayama', kanji: '高山', lat: 36.14, lon: 137.25, pos: [500, 640], etichetta: 'n',
      testo: 'Le case di legno, il mercato del mattino e il villaggio di Shirakawa-go tra le montagne.',
      esperienza: 'Un’alba a Shirakawa-go',
    },
    {
      id: 'kyoto', nome: 'Kyoto', kanji: '京都', lat: 35.01, lon: 135.77, pos: [325, 770], etichetta: 'n',
      testo: 'Templi, giardini zen e i mille portali rossi del Fushimi Inari. Il cuore antico del Giappone.',
      esperienza: 'Una cerimonia del tè a Kyoto',
    },
    {
      id: 'nara', nome: 'Nara', kanji: '奈良', lat: 34.68, lon: 135.83, pos: [425, 965], etichetta: 's',
      testo: 'Il Grande Buddha di bronzo e i cervi che si inchinano per un biscotto.',
      esperienza: 'Biscotti per i cervi di Nara',
    },
    {
      id: 'osaka', nome: 'Osaka', kanji: '大阪', lat: 34.69, lon: 135.50, pos: [290, 905], etichetta: 's',
      testo: 'Street food a Dotonbori: takoyaki, okonomiyaki e insegne al neon fino a tardi.',
      esperienza: 'Una serata di street food a Osaka',
    },
    {
      id: 'hiroshima', nome: 'Hiroshima e Miyajima', kanji: '広島', lat: 34.30, lon: 132.32, pos: [190, 985], etichetta: 'e',
      testo: 'Il grande torii che sembra galleggiare sul mare, e un momento per ricordare.',
      esperienza: 'Il torii sull’acqua di Miyajima',
    },
  ],
};
