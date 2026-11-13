# Lernplattform Komfort (inoffiziell)

Browser-Erweiterung für Firefox, Chrome und Edge. Sie passt die Darstellung der
ByCS-Lernplattform (`lernplattform.bycs.de`) an große Bildschirme an. Funktionen
der Plattform werden nicht verändert, nur das Aussehen.

Kein offizielles Angebot der ByCS oder des Kultusministeriums.

## Funktionen

Alle Punkte lassen sich im Popup (Klick auf das Symbol in der Symbolleiste)
einzeln schalten und wirken sofort.

| Einstellung | Standard | Wirkung |
|---|---|---|
| Inhaltsbreite | Breit | Standard = 1000 px wie bisher, Breit = bis 1440 px, Voll = ganze Fensterbreite |
| Textseiten lesbar schmal | an | Textseiten und Bücher bleiben bei max. 1150 px, damit Zeilen nicht zu lang werden |
| Kompakte Kopfzeile | an | Kopfzeile ca. 27 px niedriger (nur ab 1024 px Fensterbreite) |
| Barrierefreiheitsleiste ausblenden | aus | blendet die Leiste mit A−/A+/Kontrast/Dark Mode aus und spart weitere 44 px |
| Kursübersicht als dichtes Raster | an | „Meine Kurse“ zeigt je nach Breite 4–6 statt 3 Kacheln pro Zeile |
| Kompakte Kursseiten | an | Aktivitäten und Abschnitte mit weniger Abstand |
| Moderner Feinschliff | an | runde Ecken, weiche Schatten, Hover-Effekt auf Kurs- und Themenkacheln |
| Kompakte Formulare | an | Einstellungsseiten von Kurs und Aktivität: kleinere Felder, Auswahllisten, Häkchen, Buttons und Abschnittsüberschriften |
| Beschriftung links neben dem Feld | an | Formulare zweispaltig statt Beschriftung über dem Feld (ab 1100 px Fensterbreite) |
| Systemschrift | aus | ersetzt Atkinson Hyperlegible durch die Schrift des Betriebssystems |

Dark Mode und Kontrastmodus der Plattform funktionieren weiter. Die
Erweiterung übernimmt deren Farben.

## Download

Das fertige ZIP baut GitHub automatisch:

- **Feste Versionen:** unter [Releases](https://github.com/dennismarcbusch/lernplattform-komfort/releases)
  die Datei `lernplattform-komfort-<version>.zip`.
- **Aktueller Stand:** das Release
  [„latest“](https://github.com/dennismarcbusch/lernplattform-komfort/releases/tag/latest),
  wird bei jedem Push auf `main` neu gebaut.

## Installation

### Chrome / Edge / Chromium

1. ZIP herunterladen und entpacken.
2. `chrome://extensions` (bzw. `edge://extensions`) öffnen.
3. Oben rechts den **Entwicklermodus** einschalten.
4. **Entpackte Erweiterung laden** und den entpackten Ordner wählen
   (den Ordner, in dem `manifest.json` liegt).

### Firefox (zum Testen)

1. `about:debugging#/runtime/this-firefox` öffnen.
2. **Temporäres Add-on laden** und die Datei `manifest.json` wählen.

Temporäre Add-ons verschwinden beim Neustart von Firefox. Für den Dauerbetrieb
muss die Erweiterung über addons.mozilla.org signiert werden (siehe unten).

## Verteilung an Kolleginnen und Kollegen

- **Firefox:** ZIP bei https://addons.mozilla.org/developers/ hochladen und
  „Auf eigene Faust“ (unlisted) wählen. Man erhält eine signierte `.xpi`, die
  sich per Doppelklick bzw. Drag & Drop installieren lässt.
- **Chrome/Edge:** Chrome Web Store (einmalig 5 $ Entwicklergebühr, Sichtbarkeit
  „Nicht gelistet“) oder Edge-Add-ons (kostenlos).
- **Schulrechner:** Über Gruppenrichtlinien bzw. `policies.json` (Firefox)
  zwangsinstallieren.

## Datenschutz

- Berechtigungen: nur `storage` und Zugriff auf `lernplattform.bycs.de`.
- Keine Netzwerkanfragen, keine Telemetrie, kein Tracking.
- Liest keine Inhalte der Plattform aus. Gesetzt werden nur Attribute auf dem
  `<html>`-Element und ein `<style>` in der Kopfzeile.
- Einstellungen liegen im Browser-Speicher (`storage.sync`). Bei angemeldetem
  Browser-Konto synchronisiert der Browser sie zwischen den eigenen Geräten.

## Aufbau des Repos

```
extension/                    die Erweiterung selbst (das wird gezippt)
  manifest.json               Manifest V3, gemeinsam für Chrome und Firefox
  content/content.css         alle Darstellungsregeln, an data-lpk-* gebunden
  content/content.js          setzt die data-lpk-* Attribute aus den Einstellungen
  popup/                      Einstellungsfenster
  icons/
scripts/build.sh              baut dist/lernplattform-komfort-<version>.zip
.github/workflows/build.yml   prüft, baut und veröffentlicht das ZIP
```

Zum Entwickeln in Chrome den Ordner `extension/` als entpackte Erweiterung
laden, in Firefox `extension/manifest.json` als temporäres Add-on.

Jede Regel in `content.css` greift nur, wenn das passende Attribut gesetzt ist,
z. B. `html[data-lpk-polish] …`. Eigene Anpassungen am besten nach demselben
Muster ergänzen.

## Automatischer Build und neue Version veröffentlichen

Bei jedem Push und Pull Request prüft GitHub Actions die Skripte, lässt
Mozillas `web-ext lint` laufen und baut das ZIP (als Build-Artefakt im
jeweiligen Lauf). Bei Pushes auf `main` wird zusätzlich das Release „latest“
erneuert.

Für eine neue feste Version:

1. In `extension/manifest.json` die `version` erhöhen, z. B. auf `0.3.0`.
2. Committen und pushen.
3. Tag setzen und pushen:
   ```
   git tag v0.3.0
   git push origin v0.3.0
   ```

Der Workflow bricht ab, wenn Tag und Version im Manifest nicht übereinstimmen.

Lokal bauen: `bash scripts/build.sh`

## Wenn nach einem Plattform-Update etwas schief aussieht

Die Erweiterung stützt sich auf Klassen aus Moodle/Boost und dem Theme „mebis“
(`#page.drawers .main-inner`, `.block_myoverview .card-grid`, `ul.tiles`,
`bycs-topbar` …). Ändert die ByCS diese, kann einzelnes CSS ins Leere laufen.
Dann im Popup den betroffenen Schalter ausschalten oder alles über den
Hauptschalter oben rechts deaktivieren.

Getestet am 13.11.2026 mit Theme „mebis“ (Moodle 5.x), Kursformate Kacheln
(format_tiles) und Themen (format_topics) sowie den Einstellungsseiten von Kurs
und Textseite.
