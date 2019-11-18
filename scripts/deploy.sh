set -e

version_regex='^(.*"version": ")(.+)(".*)$'

releasing_version=$(
  grep version package.json |
  sed -r "s/$version_regex/\2/" |
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

files_to_replace='*.html *.css *.js *.map *.ico'

old_branch=$(git rev-parse --abbrev-ref HEAD)

sed -r "s/$version_regex/\1$releasing_version\3/" -i package.json

echo "Releasing version $releasing_version" > commit.template.tmp
git commit package.json -t commit.template.tmp
rm commit.template.tmp

rm -rf .cache/ dist/
npm run build
git tag $releasing_version

git checkout gh-pages
git pull --ff-only
git rm --ignore-unmatch $files_to_replace
mv dist/* .
git add $files_to_replace
git commit -m "Deploying version $releasing_version"

$open_browser index.html
echo Check in browser if everything is ok

sleep 5

git checkout -b $next_version $old_branch
sed -r "s/$version_regex/\1$next_version\3/" -i package.json
git commit package.json -m "Starting version $(npx semver -i $next_version)"

git checkout master
git pull --ff-only
git merge $old_branch
git checkout $next_version

echo
echo If everything is ok, run:
echo git push -u origin HEAD
echo git push origin $releasing_version gh-pages $old_branch master
