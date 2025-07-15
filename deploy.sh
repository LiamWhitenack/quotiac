FOLDER="./dist"

if [ -d "$FOLDER" ]; then
  rm -rf "$FOLDER"
  echo "Folder '$FOLDER' removed."
else
  echo "Folder '$FOLDER' does not exist."
fi

SRC="dist/_expo/static/js/web/entry-c754fd0927001efb977965b60b8e0347.js"
DEST="assets/entry-7c74954d9ef904953c5ef027aeddc0ce.js"

if [ ! -f "$DEST" ]; then
  mv "$SRC" "$DEST"
  echo "Moved $SRC to $DEST"
else
  echo "Destination file already exists: $DEST"
fi

npx expo export -p web
npm install --save-dev gh-pages
npm run deploy