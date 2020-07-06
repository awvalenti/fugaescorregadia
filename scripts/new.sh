set -e

if [ -z $1 ]; then
  >&2 echo 'Please specify file name'
  exit 1
fi

for file in $*; do
  containing_folder=${BASH_REMATCH[2]}
  [[ $file =~ ((.+\/)*)(.+) ]] && mkdir -p containing_folder

  module_name=${BASH_REMATCH[3]}
  printf "export default class $module_name {\n\n  HERE\n\n}\n" > $file.ts
  printf "import { a3, cleanup, expect, Mooca, render } from './my-libs/my-testing-library'\nimport $module_name from './$module_name'\n\na3($module_name, {\n\n  HERE\n\n})\n" > $file.test.ts
done
