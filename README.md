# Silvio & Lucia — Save the Date · *Il filo rosso*

Sito save-the-date per il matrimonio di Silvio e Lucia (luglio 2027).

Un unico **filo rosso** (quello della leggenda: chi è destinato a incontrarsi è legato da un filo invisibile) si disegna mentre scorri e attraversa tutto il sito, fino a chiudersi in un fiocco.

| # | Momento | Cosa succede |
|---|---------|--------------|
| 0 | **Busta con ceralacca** | Per aprire l'invito bisogna *tenere premuto* il sigillo, che si spezza in due |
| 1 | **Nomi** | Il filo parte da Silvio, fa un cappio attorno alla "&" e scende verso Lucia |
| 2 | **Camera oscura** | Le foto sono appese al filo con le mollette, dondolano quando scorri (e se le tocchi) e si *sviluppano* dal negativo al colore |
| 3 | **Gratta & Sposa** | Data e luogo non sono scritti: si scoprono grattando tre bollini (giorno, mese, dove). Alla vincita compaiono orario, indirizzo e link a Maps, e parte il lancio del riso |
| 4 | **Countdown** | Resta sfocato finché non hai grattato il biglietto. Pulsanti per aggiungere l'evento a Google Calendar / Apple / Outlook |
| 5 | **RSVP** | Lettera da compilare: all'invio arriva il timbro "RICEVUTO", la lettera vola via e parte il riso |
| 6 | **Il nodo** | Il filo si chiude in un fiocco; pulsante per lanciare il riso scuotendo il telefono |

In più: **Charlino** si nasconde tre volte (dietro una foto, il biglietto e la lettera): chi lo trova tutte e tre sblocca un messaggio segreto.

Niente framework e niente build: HTML, CSS e JavaScript puri. Funziona anche con `prefers-reduced-motion` e da tastiera.

---

## ✏️ Personalizzare

**Si modifica solo `assets/js/config.js`**:

- `data` → data del matrimonio (sabato 17 luglio 2027); `orario` → ora della cerimonia (17:30), vuoto = non mostrato
- `luogo` → nome della location (`breve` è quello nel bollino del gratta e vinci), città, indirizzo, link Maps
- `rsvp.entro` → data limite per rispondere (vuoto = "Fatecelo sapere appena potete")
- `foto` → elenco foto e didascalie
- `charlino` → messaggio segreto e premio per chi trova il gatto tre volte

### Foto
1. Mettete le foto in `assets/img/photos/` (JPG verticali, circa 1000 px sul lato lungo, max ~300 KB ciascuna).
2. Aggiornate i percorsi in `config.js`, per esempio `{ src: 'assets/img/photos/mare.jpg', didascalia: 'Quella volta al mare' }`.

### Anteprima su WhatsApp
`assets/img/og-image.jpg` è l'immagine che appare quando si condivide il link. È collegata tramite l'URL completo in `index.html` (`og:image`). Se cambiate indirizzo del sito, aggiornate anche quello.

---

## 📬 Ricevere le risposte RSVP

Scegliete **una** delle due opzioni e incollate l'URL in `config.js → rsvp.endpoint`.

**A. Foglio Google (consigliato, gratis e senza limiti pratici)**
Seguite le istruzioni in cima a [`tools/google-apps-script.gs`](tools/google-apps-script.gs). Le risposte arrivano come righe di un Foglio Google.

**B. Formspree**
Registratevi su formspree.io, create un form e copiate l'URL (`https://formspree.io/f/xxxx`). Le risposte arrivano via email. Il piano gratuito ha un limite mensile.

Se `endpoint` è vuoto ma `rsvp.email` è compilato, il sito apre l'app di posta con la risposta già scritta. Se sono vuoti entrambi, la risposta **non viene inviata**: va bene solo per le prove.

---

## 🎁 Pagina del regalo: il viaggio di nozze in Giappone

Pagina separata, raggiungibile dal **QR code** della partecipazione cartacea:
**https://alepiedi.github.io/matrimonio-silvio-lucia/viaggio/**

Mappa del Giappone con le tappe del viaggio: toccandone una, il filo rosso vola fin lì e compare una
carta d'imbarco con **IBAN**, intestatari e causale già pronta (con pulsanti "Copia"). Tutte le tappe
portano allo stesso conto; la pagina lo dice apertamente.

- Si modifica solo **`viaggio/config.js`**: IBAN, intestatari, banca e tappe (nome, ideogrammi, posizione, testo).
  ⚠️ L'IBAN attuale è un **segnaposto**.
- QR code pronti per la stampa: `viaggio/qr/qr-viaggio.svg` (vettoriale, per la tipografia) e
  `viaggio/qr/qr-viaggio.png` (1800×1800 px). Stamparlo almeno a **2 cm** di lato, lasciando il margine bianco.
- La pagina non viene indicizzata dai motori di ricerca (`noindex`).
- Se cambiate l'indirizzo del sito (es. un dominio vostro), **rigenerate il QR prima di stampare**.

---

## 🚀 Pubblicare (GitHub Pages)

1. Su GitHub: **Settings → Pages**
2. *Source*: "Deploy from a branch", scegliete il branch e la cartella `/ (root)`
3. Dopo circa un minuto il sito è online su **https://alepiedi.github.io/matrimonio-silvio-lucia/**

Potete collegare un dominio personalizzato (es. `silvioelucia.it`) dalla stessa pagina.

## 💻 Provare in locale

```bash
python3 -m http.server 8000
# poi aprite http://localhost:8000
```

## Struttura

```
index.html                 struttura delle sezioni
assets/js/config.js        ← i dati da modificare
assets/js/main.js          filo rosso, sigillo, gratta e vinci, riso, RSVP…
assets/css/style.css       stile
assets/img/                foto, favicon, anteprima social
tools/google-apps-script.gs  raccolta RSVP su Foglio Google
viaggio/                   pagina del regalo (mappa del Giappone) + QR code
```
