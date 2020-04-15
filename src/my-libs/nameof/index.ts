const nameof = (fn: Function | { default: Function }): string =>
  (fn as Function)?.name || (fn as { default: Function })?.default?.name || (() => {
    throw Error(`Unnamed or invalid function: ${fn}`)
  })()

export default nameof
