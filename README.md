# Silvio & Lucia — Save the Date · *Il filo rosso*

Sito save-the-date per il matrimonio di Silvio e Lucia (luglio 2027).

Un unico **filo rosso** (quello della leggenda: chi è destinato a incontrarsi è legato da un filo invisibile) si disegna mentre scorri e attraversa tutto il sito, fino a chiudersi in un fiocco.

| # | Momento | Cosa succede |
|---|---------|--------------|
| 0 | **Busta con ceralacca** | Per aprire l'invito bisogna *tenere premuto* il sigillo, che si spezza in due |
| 1 | **Nomi** | Il filo parte da Silvio, fa un cappio attorno alla "&" e scende verso Lucia |
| 2 | **La leggenda** | Il testo si accende parola per parola mentre scorri |
| 3 | **Camera oscura** | Le foto sono appese al filo con le mollette, dondolano quando scorri (e se le tocchi) e si *sviluppano* dal negativo al colore |
| 4 | **Gratta & Sposa** | La data non è scritta: si scopre grattando tre bollini. Alla vincita parte il lancio del riso |
| 5 | **Countdown** | Resta sfocato finché non hai grattato il biglietto. Pulsanti per aggiungere l'evento a Google Calendar / Apple / Outlook |
| 6 | **Cartolina "Saluti da…"** | Cartolina vintage che si gira con indirizzo, francobollo, timbro e link a Maps |
| 7 | **RSVP** | Lettera da compilare: all'invio arriva il timbro "RICEVUTO", la lettera vola via e parte il riso |
| 8 | **Il nodo** | Il filo si chiude in un fiocco |

Niente framework e niente build: HTML, CSS e JavaScript puri. Funziona anche con `prefers-reduced-motion` e da tastiera.

---

## ✏️ Personalizzare

**Si modifica solo `assets/js/config.js`**:

- `data` → data del matrimonio (sabato 17 luglio 2027); `orario` vuoto = non mostrato
- `luogo` → parola della cartolina (`saluti`), nome della location, indirizzo, link Maps
- `rsvp.entro` → data limite per rispondere (vuoto = "Fatecelo sapere appena potete")
- `foto` → elenco foto e didascalie

### Foto
1. Mettete le foto in `assets/img/photos/` (JPG verticali, circa 1000 px sul lato lungo, max ~300 KB ciascuna).
2. Aggiornate i percorsi in `config.js`, per esempio `{ src: 'assets/img/photos/mare.jpg', didascalia: 'Quella volta al mare' }`.
3. Per le lettere della cartolina potete usare una foto panoramica del luogo (`luogo.foto`).

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
assets/img/                foto (segnaposto), cartolina, favicon, anteprima social
tools/google-apps-script.gs  raccolta RSVP su Foglio Google
```
