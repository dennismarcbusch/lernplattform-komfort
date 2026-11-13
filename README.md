# Lernplattform Komfort

[![Build](https://github.com/dennismarcbusch/lernplattform-komfort/actions/workflows/build.yml/badge.svg)](https://github.com/dennismarcbusch/lernplattform-komfort/actions/workflows/build.yml)
[![Version](https://img.shields.io/github/v/release/dennismarcbusch/lernplattform-komfort?label=Version)](https://github.com/dennismarcbusch/lernplattform-komfort/releases/latest)
[![Lizenz: MIT](https://img.shields.io/badge/Lizenz-MIT-blue)](LICENSE)

Browser-Erweiterung für Chrome, Edge und Firefox, die die
[ByCS-Lernplattform](https://lernplattform.bycs.de) am PC und Laptop moderner und
übersichtlicher darstellt. Sie nutzt die Fläche großer Bildschirme, verkleinert
Kopfzeile und Formulare und zeigt mehr Kurse auf einen Blick. Funktionen der
Plattform bleiben unverändert, die Erweiterung ändert nur das Aussehen.

> Inoffizielles Projekt. Kein Angebot der ByCS oder des Bayerischen
> Staatsministeriums für Unterricht und Kultus.

## ⬇️ Download

**[Aktuelle Version herunterladen (ZIP)](https://github.com/dennismarcbusch/lernplattform-komfort/releases/latest/download/lernplattform-komfort.zip)**

Der Link zeigt immer auf die neueste veröffentlichte Version.

- [Entwicklungsstand von `main` (ZIP)](https://github.com/dennismarcbusch/lernplattform-komfort/releases/download/latest/lernplattform-komfort.zip):
  wird bei jeder Änderung neu gebaut, kann unfertige Neuerungen enthalten.
- [Alle Versionen mit Änderungsübersicht](https://github.com/dennismarcbusch/lernplattform-komfort/releases)

## Was die Erweiterung macht

Alle Punkte lassen sich im Popup (Klick auf das Symbol in der Symbolleiste)
einzeln schalten und wirken sofort. Ein Hauptschalter oben rechts deaktiviert
alles auf einmal.

| Einstellung | Standard | Wirkung |
|---|---|---|
| Inhaltsbreite | Breit | Standard = 1000 px wie bisher, Breit = bis 1440 px, Voll = ganze Fensterbreite |
| Textseiten lesbar schmal halten | an | Textseiten und Bücher bleiben bei max. 1150 px, damit die Zeilen nicht zu lang werden |
| Kompakte Kopfzeile | an | Kopfzeile ca. 27 px niedriger (ab 1024 px Fensterbreite) |
| Barrierefreiheitsleiste ausblenden | aus | blendet die Leiste mit A−/A+/Kontrast/Dark Mode aus und spart weitere 44 px |
| Kompakte Formulare | an | Einstellungsseiten von Kurs und Aktivität: kleinere Felder, Auswahllisten, Häkchen, Buttons und Abschnittsüberschriften |
| Beschriftung links neben dem Feld | an | Formulare zweispaltig statt Beschriftung über dem Feld (ab 1100 px Fensterbreite) |
| Kursübersicht als dichtes Raster | an | „Meine Kurse“ zeigt je nach Breite 4–6 statt 3 Kacheln pro Zeile |
| Kompakte Kursseiten | an | Aktivitäten und Abschnitte mit weniger Abstand |
| Moderner Feinschliff | an | runde Ecken, weiche Schatten, Hover-Effekt auf Kurs- und Themenkacheln |
| Systemschrift | aus | ersetzt Atkinson Hyperlegible durch die Schrift des Betriebssystems |

Dark Mode und Kontrastmodus der Plattform funktionieren weiter. Die Erweiterung
übernimmt deren Farben.

## Installation

### Chrome, Edge, Chromium

1. [ZIP herunterladen](https://github.com/dennismarcbusch/lernplattform-komfort/releases/latest/download/lernplattform-komfort.zip)
   und in einen festen Ordner entpacken. Der Browser lädt die Erweiterung bei
   jedem Start aus diesem Ordner, also nicht im Download-Ordner liegen lassen.
2. `chrome://extensions` bzw. `edge://extensions` öffnen.
3. Oben rechts den **Entwicklermodus** einschalten.
4. **Entpackte Erweiterung laden** und den entpackten Ordner wählen
   (den Ordner, in dem `manifest.json` liegt).
5. Optional: Über das Puzzle-Symbol die Erweiterung an die Symbolleiste anheften.

**Aktualisieren:** Neues ZIP in denselben Ordner entpacken und in
`chrome://extensions` bei der Erweiterung auf das Neu-laden-Symbol klicken.

### Firefox (zum Ausprobieren)

1. ZIP herunterladen und entpacken.
2. `about:debugging#/runtime/this-firefox` öffnen.
3. **Temporäres Add-on laden** und die Datei `manifest.json` wählen.

Temporäre Add-ons verschwinden beim Neustart von Firefox. Für den Dauerbetrieb
muss die Erweiterung über addons.mozilla.org signiert werden (siehe unten).

## Verteilung an Kolleginnen und Kollegen

- **Firefox:** ZIP unter https://addons.mozilla.org/developers/ hochladen und
  „Auf eigene Faust“ (unlisted) wählen. Man erhält eine signierte `.xpi`, die
  sich per Doppelklick installieren lässt.
- **Chrome/Edge:** Chrome Web Store (einmalig 5 $ Entwicklergebühr, Sichtbarkeit
  „Nicht gelistet“) oder Edge-Add-ons (kostenlos).
- **Schulrechner:** Über Gruppenrichtlinien bzw. `policies.json` (Firefox)
  zentral installieren.

## Datenschutz

- Berechtigungen: nur `storage` und Zugriff auf `lernplattform.bycs.de`.
- Keine Netzwerkanfragen, keine Telemetrie, kein Tracking.
- Liest keine Inhalte der Plattform aus. Gesetzt werden nur Attribute auf dem
  `<html>`-Element und ein `<style>` in der Kopfzeile.
- Einstellungen liegen im Browser-Speicher (`storage.sync`). Bei angemeldetem
  Browser-Konto synchronisiert der Browser sie zwischen den eigenen Geräten.
- Der komplette Quellcode liegt in diesem Repository und lässt sich prüfen.

## Wenn nach einem Plattform-Update etwas schief aussieht

Die Erweiterung stützt sich auf Klassen aus Moodle/Boost und dem Theme „mebis“
(`#page.drawers .main-inner`, `.block_myoverview .card-grid`, `ul.tiles`,
`.mform`, `bycs-topbar` …). Ändert die ByCS diese, kann einzelnes CSS ins Leere
laufen. Dann im Popup den betroffenen Schalter ausschalten oder alles über den
Hauptschalter deaktivieren, und gern ein
[Issue](https://github.com/dennismarcbusch/lernplattform-komfort/issues) anlegen.

Getestet am 13.11.2026 mit Theme „mebis“ (Moodle 5.x), den Kursformaten Kacheln
(format_tiles) und Themen (format_topics) sowie den Einstellungsseiten von Kurs
und Textseite.

## Entwicklung

### Aufbau

```
extension/                    die Erweiterung selbst (wird gezippt)
  manifest.json               Manifest V3, gemeinsam für Chrome und Firefox
  content/content.css         alle Darstellungsregeln, an data-lpk-* gebunden
  content/content.js          setzt die data-lpk-* Attribute aus den Einstellungen
  popup/                      Einstellungsfenster
  icons/
scripts/build.sh              baut die ZIP-Dateien in dist/
.github/workflows/build.yml   prüft, baut und veröffentlicht das ZIP
```

Jede Regel in `content.css` greift nur, wenn das passende Attribut gesetzt ist,
z. B. `html[data-lpk-polish] …`. Neue Anpassungen am besten nach demselben
Muster ergänzen und den Schalter in `content.js`, `popup.js` und `popup.html`
eintragen.

Zum Entwickeln in Chrome den Ordner `extension/` als entpackte Erweiterung
laden, in Firefox `extension/manifest.json` als temporäres Add-on.

### Automatischer Build

Bei jedem Push und Pull Request prüft GitHub Actions die Skripte, lässt
Mozillas `web-ext lint` laufen und baut das ZIP. Bei Pushes auf `main` wird
außerdem das Vorab-Release „latest“ erneuert.

**Neue Version veröffentlichen:** In `extension/manifest.json` die `version`
erhöhen (z. B. auf `0.3.0`) und auf `main` pushen. Der Workflow legt dann
automatisch das Release `v0.3.0` mit dem ZIP an. Pushes ohne neue
Versionsnummer aktualisieren nur „latest“.

Lokal bauen: `bash scripts/build.sh`

## Lizenz

[MIT-Lizenz](LICENSE), © 2026 Dennis Busch. Der Code darf frei verwendet,
verändert und weitergegeben werden, auch in anderen Projekten, solange der
Lizenzhinweis erhalten bleibt.
