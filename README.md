# Moments Invitations

Einladungs-Website für Hochzeiten und besondere Anlässe. Statisches HTML/CSS/JS-Frontend mit einem kleinen Node/Express-Server für die Gäste-Fotogalerie (Upload + Anzeige über Google Drive).

Aufbau angelehnt an klassische Einladungs-Seiten wie [smartpozivnice.com](https://smartpozivnice.com): durchgehendes Foto im Hintergrund, Hero mit Namen in Schreibschrift, persönliche Nachricht, Event-Details mit Kartenlink, Live-Countdown, Musik-Player, Foto-Galerie mit Lightbox und RSVP-Formular mit Anmeldefrist.

## Struktur

- `public/index.html` — Hero, persönliche Nachricht, Location, Ablauf, Countdown, Musik-Player, Galerie, RSVP
- `public/css/style.css` — Styling (durchgehendes Hintergrundfoto, Karten-Layout, Dark-Mode-fähige Farben)
- `public/js/script.js` — Countdown, RSVP-Anmeldefrist, Musik-Player-Steuerung, Foto-Upload
- `public/assets/` — Ablage für Hintergrundfoto und Musik (siehe unten)
- `server.js` — Express-Server: liefert `public/` aus, nimmt Uploads über `/api/photos` (POST) entgegen und liefert über `/api/gallery-link` (GET) den Link zum Drive-Ordner. Nur `public/` ist öffentlich erreichbar — `server.js`, `.env` etc. bleiben unzugänglich.

## Gäste-Fotogalerie (Google Drive)

Unter "Momente" gibt es zwei Buttons: **"Fotos hinzufügen"** (Upload direkt von der Seite) und **"Galerie ansehen"** (öffnet den Google-Drive-Ordner in einem neuen Tab, wo alle hochgeladenen Fotos liegen). Es gibt keine eingebettete Foto-Anzeige auf der Seite selbst — die Ansicht läuft komplett über Drive.

**Wichtig:** Damit Gäste den Ordner ohne eigenen Google-Login öffnen können, muss der Drive-Ordner auf **"Jeder mit dem Link" → "Betrachter"** freigegeben sein (Rechtsklick auf den Ordner in Drive → Teilen → Allgemeiner Zugriff → "Jeder mit dem Link").

### Einmalige Einrichtung

1. **Google Drive API aktivieren**: [console.cloud.google.com](https://console.cloud.google.com) → Projekt wählen → APIs & Dienste → Bibliothek → "Google Drive API" → Aktivieren
2. **OAuth-Zustimmungsbildschirm**: APIs & Dienste → OAuth-Zustimmungsbildschirm → User-Typ "Extern", App-Name + Kontakt-E-Mail eintragen, speichern → danach unbedingt auf **"App veröffentlichen"** klicken (sonst laufen Zugangs-Token nach 7 Tagen ab)
3. **OAuth-Client erstellen**: APIs & Dienste → Anmeldedaten → Anmeldedaten erstellen → OAuth-Client-ID → Typ "Webanwendung" → Redirect-URI `https://developers.google.com/oauthplayground` → Client-ID & Client-Secret notieren
4. **Refresh-Token holen**: [developers.google.com/oauthplayground](https://developers.google.com/oauthplayground) → Zahnrad → "Use your own OAuth credentials" mit Client-ID/Secret → Scope `https://www.googleapis.com/auth/drive.file` eintragen → Authorize APIs → einloggen → "Exchange authorization code for tokens" → Refresh-Token kopieren
5. **Drive-Ordner anlegen**: Ordner in Google Drive erstellen, ID aus der URL kopieren (`drive.google.com/drive/folders/<ID>`)
6. **Umgebungsvariablen setzen**: lokal in `.env` (siehe `.env.example`), auf Railway unter Service → Variables:
   - `GOOGLE_CLIENT_ID`
   - `GOOGLE_CLIENT_SECRET`
   - `GOOGLE_REFRESH_TOKEN`
   - `GOOGLE_DRIVE_FOLDER_ID`

Ohne diese Variablen liefern `/api/photos` und `/api/gallery-link` einen Hinweis "Google Drive ist noch nicht konfiguriert" statt eines Fehlers — die restliche Seite funktioniert trotzdem normal.

## Lokal ansehen

```bash
npm install
npm start
```

Danach `http://localhost:3000` öffnen. Für die Galerie-Funktion vorher `.env` mit den vier Google-Werten anlegen (siehe oben).

## Anpassen

Namen, Datum, Location und Ablauf direkt in `index.html` anpassen. Das Hochzeitsdatum für den Countdown und die RSVP-Frist stehen in `js/script.js` (`weddingDate`, `rsvpDeadline`).

## Deployment (Railway)

1. Auf [railway.com/new](https://railway.com/new) → "Deploy from GitHub repo"
2. Repo `Pekiva/moments-invitations` auswählen
3. Railway erkennt `package.json`, installiert Dependencies und startet `npm start` (→ `node server.js`) automatisch
4. Unter Service → Variables die vier `GOOGLE_*`-Werte eintragen (siehe oben)

## Musik-Player

Der Player steuert ein unsichtbar eingebettetes YouTube-Video über die offizielle YouTube-IFrame-API (`public/js/script.js`, `onYouTubeIframeAPIReady`) — es wird kein Audio heruntergeladen oder aus YouTube extrahiert, das wäre urheberrechtlich problematisch. Song wechseln: in `public/index.html` Titel/Interpret anpassen und in `script.js` die `videoId` (aus der YouTube-URL, z.B. `youtu.be/`**`6_8FWYetqZs`**) austauschen.

## Assets ergänzen

Diese Datei fehlt noch und sollte vor dem Live-Gang ergänzt werden:

- `assets/hero-bg.jpg` — Hintergrundfoto, läuft durch die ganze Seite (ohne Datei erscheint ein brauner Verlauf als Platzhalter)

## Offene Punkte

- Das RSVP-Formular zeigt aktuell nur eine clientseitige Bestätigung an und sendet keine Daten. Für echte Zusagen muss noch ein Backend/Formular-Service (z.B. Formspree, eigene API) angebunden werden.
- Der Foto-Upload hat keine Login-Schranke — jeder mit dem Link kann Fotos hochladen (max. 10 MB, nur Bilder, kein Löschen durch Gäste möglich). Für mehr Kontrolle könnte man z.B. eine einfache Zugangs-PIN ergänzen.
