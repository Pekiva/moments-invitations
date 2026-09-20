# Moments Invitations

Statische Einladungs-Website für Hochzeiten und besondere Anlässe. Reines HTML/CSS/JS, kein Build-Prozess nötig.

Aufbau angelehnt an klassische Einladungs-Seiten wie [smartpozivnice.com](https://smartpozivnice.com): durchgehendes Foto im Hintergrund, Hero mit Namen in Schreibschrift, persönliche Nachricht, Event-Details mit Kartenlink, Live-Countdown, Musik-Player, Foto-Galerie mit Lightbox und RSVP-Formular mit Anmeldefrist.

## Struktur

- `index.html` — Hero, persönliche Nachricht, Location, Ablauf, Countdown, Musik-Player, Galerie, RSVP
- `css/style.css` — Styling (durchgehendes Hintergrundfoto, Karten-Layout, Dark-Mode-fähige Farben)
- `js/script.js` — Countdown, RSVP-Anmeldefrist, Musik-Player-Steuerung, Galerie-Lightbox
- `assets/` — Ablage für Hintergrundfoto, Galerie-Bilder und Musik (siehe unten)

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

## Assets ergänzen

Diese Dateien fehlen noch und sollten vor dem Live-Gang ergänzt werden:

- `assets/hero-bg.jpg` — Hintergrundfoto, läuft durch die ganze Seite (ohne Datei erscheint ein brauner Verlauf als Platzhalter)
- `assets/audio/track-1.mp3`, `assets/audio/track-2.mp3` — Songs für den Musik-Player
- Echte Galerie-Fotos anstelle der `gallery-placeholder`-Kacheln in `index.html`

## Offene Punkte

- Das RSVP-Formular zeigt aktuell nur eine clientseitige Bestätigung an und sendet keine Daten. Für echte Zusagen muss noch ein Backend/Formular-Service (z.B. Formspree, eigene API) angebunden werden.
- Die Galerie-Lightbox zeigt aktuell nur einen Platzhalter, sobald ein Foto angeklickt wird — sie muss noch mit echten Bildern befüllt werden.
