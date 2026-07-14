#!/bin/bash
# fix-internal-links.sh
# Rulează din rădăcina proiectului: bash fix-internal-links.sh
# Testează mai întâi cu DRY_RUN=true bash fix-internal-links.sh

DRY_RUN=${DRY_RUN:-false}
CONTENT_DIR="content/articles"
BACKUP_DIR="_backup_links_$(date +%Y%m%d_%H%M%S)"

# Verticalele care au nevoie de prefix
VERTICALS=(
  "zboruri"
  "cazari"
  "croaziere"
  "city-breaks"
  "asigurari"
  "inchirieri-auto"
  "esim-roaming"
  "experiente"
)

echo "=== Fix linkuri interne plecari.com ==="
echo "DRY_RUN=$DRY_RUN"
echo ""

if [ ! -d "$CONTENT_DIR" ]; then
  echo "EROARE: Nu găsesc folderul $CONTENT_DIR"
  echo "Asigură-te că rulezi scriptul din rădăcina proiectului (plecari/)"
  exit 1
fi

# Backup complet înainte de orice modificare
if [ "$DRY_RUN" = "false" ]; then
  echo "📦 Fac backup în $BACKUP_DIR ..."
  cp -r "$CONTENT_DIR" "$BACKUP_DIR"
  echo "✅ Backup gata"
  echo ""
fi

# Funcție care procesează un fișier pentru un anumit locale
fix_file() {
  local file="$1"
  local locale="$2"
  local changed=0

  for vertical in "${VERTICALS[@]}"; do
    # Pattern: ]( /vertical/ fără prefix locale
    # Detectăm ](/ vertical / dar nu ]( /ro/ vertical / sau ]( /en/ vertical /
    local pattern="\](/${vertical}/)"
    local replacement="](/${locale}/${vertical}/)"

    if grep -qP "\]\(/${vertical}/" "$file" 2>/dev/null; then
      if [ "$DRY_RUN" = "true" ]; then
        echo "  [DRY] $file → ](/$vertical/ → ](/${locale}/$vertical/"
        grep -nP "\]\(/${vertical}/" "$file" | head -3
      else
        sed -i "s|](/${vertical}/|](/${locale}/${vertical}/|g" "$file"
      fi
      changed=1
    fi
  done

  echo $changed
}

total_files=0
total_changed=0

echo "=== Procesez articole .ro.mdx ==="
while IFS= read -r -d '' file; do
  result=$(fix_file "$file" "ro")
  if [ "$result" = "1" ]; then
    echo "  ✓ $(basename $file)"
    ((total_changed++))
  fi
  ((total_files++))
done < <(find "$CONTENT_DIR" -name "*.ro.mdx" -print0)

echo ""
echo "=== Procesez articole .en.mdx ==="
while IFS= read -r -d '' file; do
  result=$(fix_file "$file" "en")
  if [ "$result" = "1" ]; then
    echo "  ✓ $(basename $file)"
    ((total_changed++))
  fi
  ((total_files++))
done < <(find "$CONTENT_DIR" -name "*.en.mdx" -print0)

echo ""
echo "=== RAPORT FINAL ==="
echo "Fișiere scanate: $total_files"
echo "Fișiere modificate: $total_changed"

if [ "$DRY_RUN" = "false" ] && [ $total_changed -gt 0 ]; then
  echo ""
  echo "📁 Backup salvat în: $BACKUP_DIR"
  echo "   (poți da rollback cu: rm -rf $CONTENT_DIR && mv $BACKUP_DIR $CONTENT_DIR)"
fi

# Verificare finală — caută linkuri rămase fără prefix
echo ""
echo "=== VERIFICARE — linkuri fără prefix rămase ==="
found_remaining=0
for vertical in "${VERTICALS[@]}"; do
  count=$(grep -rP "\]\(/${vertical}/" "$CONTENT_DIR" --include="*.mdx" | wc -l)
  if [ $count -gt 0 ]; then
    echo "  ⚠️  ](/$vertical/ : $count linkuri rămase"
    grep -rP "\]\(/${vertical}/" "$CONTENT_DIR" --include="*.mdx" -l | head -5
    found_remaining=1
  fi
done

if [ $found_remaining -eq 0 ]; then
  echo "  ✅ Niciun link fără prefix rămas — totul curat!"
fi