set -e

if [ -z $1 ] || [ -z $2 ]; then
  >&2 echo 'Please specify identifier source and destination names'
  exit 1
fi

find='find -regextype posix-extended -regex ".+\.(ts|tsx|js|jsx|json|yml|yaml)" '

for dir in $(cat .eslintignore); do
  find+="-not -path './$dir*' "
done

for file in $(eval $find | xargs grep -l $1); do
  echo $file
  sed -r "s/$1/$2/g" -i $file
  if [[ $file =~ $1 ]]; then
    mv $file ${file/$1/$2}
  fi
done
