export const noop = () => {}

export const asyncNoop = async() => {}

export const timeout = (waitTime: number) => new Promise(resolve => setTimeout(resolve, waitTime))
