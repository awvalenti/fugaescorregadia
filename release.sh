version=$1

if [ -z "$version" ]; then
  >&2 echo "Please supply version parameter"
  exit 1
fi

# https://stackoverflow.com/questions/394230/how-to-detect-the-os-from-a-bash-script
if [[ "$OSTYPE" == "linux-gnu" ]]; then open_browser=xdg-open
elif [[ "$OSTYPE" == "darwin"* ]]; then open_browser=open
else open_browser=start
fi

files_to_replace='*.html *.css *.js *.map'

rm -rf .cache/ dist/ && \
  npm run parcel-build && \
  git tag $1 && \
  git checkout gh-pages && \
  git rm $files_to_replace && \
  mv dist/* . && \
  git add $files_to_replace && \
  git commit -m "Delivering version $version" && \
  echo && \
  echo ---- Build successful! ---- && \
  echo Running OK on the browser? If so, git push to finish! && \
  $open_browser index.html
