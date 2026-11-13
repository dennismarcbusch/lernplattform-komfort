#!/usr/bin/env bash
# Baut das installierbare ZIP aus dem Ordner extension/.
# Ergebnis: dist/lernplattform-komfort-<version>.zip
#           dist/lernplattform-komfort.zip (gleicher Inhalt, fester Name für
#           den dauerhaften Download-Link im README)
set -euo pipefail

cd "$(dirname "$0")/.."

VERSION=$(python3 -c 'import json; print(json.load(open("extension/manifest.json"))["version"])')
OUT="dist/lernplattform-komfort-${VERSION}.zip"

rm -rf dist
mkdir -p dist

# README und LICENSE mit ins Archiv
cp README.md extension/README.md
cp LICENSE extension/LICENSE
trap 'rm -f extension/README.md extension/LICENSE' EXIT

# -X: keine Zusatzattribute, Dateien sortiert für reproduzierbare Archive
(cd extension && find . -type f ! -name '.*' | LC_ALL=C sort | zip -q -X -@ "../${OUT}")

cp "${OUT}" dist/lernplattform-komfort.zip

echo "${OUT}"
