/**
 * Riceve le risposte RSVP del sito e le salva in un Foglio Google.
 *
 * Installazione (5 minuti):
 *  1. Crea un nuovo Foglio Google (es. "RSVP Silvio & Lucia").
 *  2. Menu Estensioni → Apps Script, incolla questo file e salva.
 *  3. Pulsante "Esegui il deployment" → "Nuovo deployment" → tipo "App web".
 *     - Esegui come: Me
 *     - Chi ha accesso: Chiunque
 *  4. Autorizza, copia l'URL che termina con /exec e incollalo in
 *     assets/js/config.js → rsvp.endpoint
 */
const COLONNE = ['inviato', 'partecipa', 'nome', 'contatto', 'ospiti', 'accompagnatori', 'allergie', 'messaggio'];

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(COLONNE.map((c) => c.charAt(0).toUpperCase() + c.slice(1)));
      sheet.setFrozenRows(1);
    }
    const p = e.parameter || {};
    sheet.appendRow(COLONNE.map((c) => p[c] || ''));
    return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}
