FOLDER="./dist"

if [ -d "$FOLDER" ]; then
  rm -rf "$FOLDER"
  echo "Folder '$FOLDER' removed."
else
  echo "Folder '$FOLDER' does not exist."
fi

npx expo export -p web
eas deploy