set -e

if [ -z $* ]; then
  >&2 echo 'Please specify file name'
  exit 1
fi

for file in $*; do
  path=src/$file
  [[ $path =~ ((.+\/)*)(.+) ]] && mkdir -p ${BASH_REMATCH[2]}
  touch $path.ts $path.test.ts
done
