set -e

if [ -z $1 ]; then
  >&2 echo 'Please specify file name'
  exit 1
fi

path=src/$1
touch $path.ts $path.test.ts
