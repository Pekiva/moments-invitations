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

## Offene Punkte

Das RSVP-Formular zeigt aktuell nur eine clientseitige Bestätigung an und sendet keine Daten. Für echte Zusagen muss noch ein Backend/Formular-Service (z.B. Formspree, eigene API) angebunden werden.
