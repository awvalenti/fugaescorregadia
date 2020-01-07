export default class Mooca {

  private originals: Map<[any, string], any> = new Map

  stub<T extends object, K extends keyof T & string>(
    module: T, exportName: K, newValue: T[K]): void

  stub<T extends object, K extends keyof T & string>(
    module: T, newValue: T[K]): void

  stub<T extends { default: any }, K extends keyof T & string>(
    module: T, arg1: K | T[K], arg2?: T[K]): void {
    if (arg2 !== undefined) {
      this._stub(module, arg1 as K, arg2)
    } else {
      this._stub(module, 'default', arg1 as T[K])
    }
  }

  restore(): void {
    this.originals.forEach((originalValue, [module, exportName]) => {
      module[exportName] = originalValue
    })
  }

  _stub<T extends object, K extends keyof T & string>(
    module: T, exportName: K, newValue: T[K]): void {
    const oldValue = module[exportName]
    this.originals.set([module, exportName], oldValue)
    module[exportName] = newValue
  }

}
