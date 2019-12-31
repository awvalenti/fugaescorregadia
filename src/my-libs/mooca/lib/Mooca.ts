export default class Mooca {

  private originals: Map<[any, string], any> = new Map

  stub<T extends object, K extends keyof T & string>(
    module: T, exportName: K, newValue: T[K]): void {
    const oldValue = module[exportName]
    this.originals.set([module, exportName], oldValue)
    module[exportName] = newValue
  }

  restore(): void {
    this.originals.forEach((originalValue, [module, exportName]) => {
      module[exportName] = originalValue
    })
  }

}
