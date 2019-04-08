version_regex='^(.*"version": ")(.+)(".*)$'

releasing_version=$(
  grep version package.json | \
  sed -E "s/$version_regex/\2/" | \
  xargs npx semver -i
  )

if [ -z "$releasing_version" ]; then
  >&2 echo "Error determining version to be released. Check package.json."
  exit 1
fi

next_version=$(npx semver --preid snapshot -i preminor $releasing_version)

# https://stackoverflow.com/questions/394230/how-to-detect-the-os-from-a-bash-script
if [[ "$OSTYPE" == "linux-gnu" ]]; then open_browser=xdg-open
elif [[ "$OSTYPE" == "darwin"* ]]; then open_browser=open
else open_browser=start
fi

files_to_replace='*.html *.css *.js *.map'

old_branch=$(git rev-parse --abbrev-ref HEAD)

sed -i -E "s/$version_regex/\1$releasing_version\3/" package.json && \
  echo "Releasing version $releasing_version" > commit.template &&
  git commit package.json -t commit.template && \
  rm commit.template &&
  rm -rf .cache/ dist/ && \
  npm run parcel-build && \
  git tag $releasing_version && \
  git checkout gh-pages && \
  git rm $files_to_replace && \
  mv dist/* . && \
  git add $files_to_replace && \
  git commit -m "Deploying version $releasing_version" && \
  $open_browser index.html && \
  echo && \
  echo && \
  echo Check in browser if everything is ok. If so: && \
  echo && \
  echo From now on, automation didn\'t work. Please run manually: && \
  echo && \
  echo git checkout -b $next_version $old_branch && \
  echo sed -i -E \'s/$version_regex/\\1$next_version\\3/\' package.json && \
  echo git commit package.json -m \
    \'Starting version $(npx semver -i $next_version)\' && \
  echo git checkout master && \
  echo git merge $old_branch && \
  echo git checkout $next_version && \
  echo git push -u origin HEAD && \
  echo git push --all
