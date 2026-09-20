# Moments Invitations

Statische Einladungs-Website für Hochzeiten und besondere Anlässe. Reines HTML/CSS/JS, kein Build-Prozess nötig.

## Struktur

- `index.html` — Seite mit Hero, Countdown, Ablauf, Location, Galerie und RSVP-Formular
- `css/style.css` — Styling (inkl. Dark-Mode via `prefers-color-scheme`)
- `js/script.js` — Countdown-Logik und RSVP-Formular-Handling

## Lokal ansehen

Einfach `index.html` im Browser öffnen, oder mit einem lokalen Server:

```bash
python3 -m http.server 8000
```

Danach `http://localhost:8000` öffnen.

## Anpassen

Namen, Datum, Location und Ablauf direkt in `index.html` anpassen. Das Hochzeitsdatum für den Countdown steht in `js/script.js` (`weddingDate`).

## Deployment (Railway)

Das Repo enthält ein `package.json` mit dem `serve`-Paket, damit Railway (Nixpacks) die Seite als Node-Projekt erkennt und startet:

1. Auf [railway.com/new](https://railway.com/new) → "Deploy from GitHub repo"
2. Repo `Pekiva/moments-invitations` auswählen
3. Railway erkennt `package.json`, installiert Dependencies und startet `npm start` automatisch — keine weitere Konfiguration nötig

## Offene Punkte

Das RSVP-Formular zeigt aktuell nur eine clientseitige Bestätigung an und sendet keine Daten. Für echte Zusagen muss noch ein Backend/Formular-Service (z.B. Formspree, eigene API) angebunden werden.
