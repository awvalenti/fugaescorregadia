if [ -z $1 ] || [ -z $2 ]; then
  >&2 echo "Please specify identifier source and destination names"
  exit 1
fi

find='find -name *.coffee '

for dir in $(cat .gitignore); do
  find+="-not -path './$dir*' "
done

for file in $($find); do
  sed -r "s/$1/$2/g" -i $file
  if [[ $file =~ $1 ]]; then
    mv $file ${file/$1/$2}
  fi
done
