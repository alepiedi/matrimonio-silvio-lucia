# 🎬 L'Ultima Ripetizione · il kit sponsor dell'addio al celibato

L'idea in una riga: **l'addio al celibato di Silvio diventa un film** (trailer, riprese sui social, aftermovie, titoli di coda) e le aziende possono entrare nel cast come "produttori".

Perché funziona:
- **Il genere esiste e piace.** Tutti conoscono i film sull'addio al celibato, ma in Italia manca il nostro. Un'azienda capisce il concept in cinque secondi.
- **Il protagonista è perfetto.** Silvio è un prof di scienze motorie con una palestra a Prati. "L'ultima ripetizione" vale per la scuola (le ripetizioni) e per la palestra (l'ultima serie).
- **La crew è credibile.** Ingegnere, commercialista, economista, casaro: ogni mestiere diventa una garanzia per lo sponsor (organizzazione, conti trasparenti, report, catering).
- **La location è libera.** Invece di un limite, è il pacchetto più ricco: una struttura o un territorio può "comprarsi" il set.

---

## 📦 Cosa c'è qui dentro

| File | A cosa serve |
|---|---|
| [`index.html`](index.html) | Il sito da mandare alle aziende (press kit del "film") |
| [`locandina.pdf`](locandina.pdf) | Due pagine A4: locandina + pitch. Da stampare per le visite di persona o da allegare alle email |
| [`kit/messaggi.md`](kit/messaggi.md) | Email, DM Instagram, LinkedIn, telefonata, visita di persona, solleciti, risposte alle obiezioni |
| [`kit/aziende.md`](kit/aziende.md) | Chi contattare, in che ordine e con quale gancio |
| [`kit/accordo.md`](kit/accordo.md) | Lettera d'accordo di una pagina da far firmare |
| [`kit/contenuti.md`](kit/contenuti.md) | Piano dei contenuti e sfide sponsorizzabili: come mantenere le promesse |
| [`kit/contatti.csv`](kit/contatti.csv) | Tabella per tracciare chi avete contattato (aprite con Excel o Google Fogli) |

---

## ✅ Prima di mandare il link a qualcuno

1. **Parlatene con Silvio.** Non serve svelargli il programma, ma deve sapere che sarà il protagonista pubblico di contenuti sponsorizzati e che la sua palestra viene citata. Chiedetegli se la palestra può ripostare i contenuti.
2. **Parlatene con Lucia** solo se volete usare il matrimonio (proiezione dell'aftermovie al ricevimento). Se dicono sì, mettete `primaAlMatrimonio: true` in `config.js`.
3. **Compilate `assets/js/config.js`:**
   - `contatti`: create un **indirizzo email dedicato** (es. `ultimaripetizione@gmail.com`) e un **profilo Instagram** del film. Fa molto più "produzione" e non mescolate le email personali.
   - `pubblico`: sommate i follower veri di tutta la crew e della palestra. Se un numero non lo sapete, lasciate `null`: non viene mostrato.
   - `crew`: aggiungete i nomi, se volete, e altri membri (copiate un blocco). Icone disponibili: `kettlebell`, `compasso`, `registro`, `grafico`, `formaggio`, `ciak`.
   - `pacchetti`: rivedete i valori. Sono di partenza e prudenti.
   - `chiusuraCasting`: la scadenza crea urgenza. Rispettatela.
4. **Rigenerate il PDF e l'anteprima social** (vedi sotto).
5. **Provate il modulo "Provino"** dal telefono: deve aprire la mail o WhatsApp con il messaggio pronto.

## 🛠 Rigenerare locandina e anteprima

```bash
npm i -D playwright          # una volta sola
node celibato/tools/render.mjs
```

Crea `locandina.pdf` e `assets/img/og-image.jpg` (l'immagine che appare quando incollate il link su WhatsApp).

## 🚀 Pubblicare

La pagina viaggia con il sito del matrimonio su GitHub Pages:
**https://alepiedi.github.io/matrimonio-silvio-lucia/celibato/**

- Ha `noindex`: Google non la mostra, quindi Silvio non la trova cercando il suo nome. Chi ha il link però può aprirla.
- Se volete più riservatezza, spostate la cartella in un repository separato o rinominatela (es. `celibato-x7k2/`).
- Un dominio dedicato (es. `ultimaripetizione.it`, circa 10 €/anno) fa ancora più effetto nelle email.

---

## 🗓 Il piano, settimana per settimana

| Quando | Cosa | Chi |
|---|---|---|
| **Ottobre 2026** | Config compilato, email e Instagram del film creati, lista dei primi 60 contatti in `contatti.csv` | Ingegnere + tutti |
| **Ottobre 2026** | Primo giro "caldo": fornitori della palestra, del caseificio, clienti e amici imprenditori (vedi `aziende.md`, cerchio 1) | Ognuno i propri |
| **Novembre 2026** | Caccia alla **Location Ufficiale**: 15–20 strutture e consorzi turistici. È il pacchetto che sblocca tutto il resto | 2 persone dedicate |
| **Novembre 2026** | Post Instagram "Cercasi produttori" con la locandina, condiviso da tutta la crew | Tutti |
| **Dicembre 2026** | Secondo giro: brand nazionali ed emergenti (cerchio 3). Solleciti al primo giro | Economista |
| **Gennaio 2027** | Accordi firmati (`accordo.md`), loghi raccolti, ordine delle magliette | Commercialista |
| **31 gennaio 2027** | Chiusura del casting | |
| **Febbraio – marzo 2027** | Trailer (anche solo 30 secondi col telefono) con i loghi dei partner | Chi sa montare |
| **Primavera 2027** | Riprese | Tutti (tranne Silvio, che subisce) |
| **+15 giorni** | Aftermovie e report per ogni partner | Economista |
| **Luglio 2027** | (Se approvato) proiezione al matrimonio | |

## 👥 Chi fa cosa

- **Ingegnere → produzione.** Tiene il calendario, `contatti.csv` e la checklist delle consegne.
- **Commercialista → contratti e cassa.** Accordi firmati, registro di quanto entra e dove va. Vedi la nota fiscale in `accordo.md`.
- **Economista → sponsor e report.** Segue i partner dopo il sì, raccoglie i numeri e manda il report finale.
- **Casaro → territorio.** Fornitori, produttori locali, fiere, la rete del caseificio.
- **Tutti:** 10 contatti a testa dalla propria rete personale. È lì che arrivano i primi sì.

## 🎯 Obiettivi realistici

Su **60–80 contatti** mirati aspettatevi circa:
- 30–40% di risposte, soprattutto dai contatti caldi e dalle attività locali;
- **8–15 partner**, in gran parte in prodotti, sconti e servizi;
- con un po' di fortuna **una Location Ufficiale**, che da sola può coprire una buona parte del viaggio.

Il primo sì è il più difficile. Appena ne avete uno, mettete il logo sul sito: gli altri si fidano di più.

## ⚠️ Regole d'oro

1. **Mai promettere numeri che non controllate.** Promettete le consegne (quanti post, quando, con quale tag).
2. **Dichiarate sempre le collaborazioni** (#adv, "partnership retribuita" su Instagram): lo chiedono le regole AGCOM e le piattaforme.
3. **Niente contenuti imbarazzanti per il brand** e niente alcol in mano a chi guida nei video.
4. **Mantenete tutto quello che avete promesso**, anche al più piccolo fornitore tecnico. Il report finale è la cosa che ricorderanno.
