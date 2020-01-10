export default class Mooca {

  private originals: Map<[any, string], any> = new Map

  stub<T extends { default: any }>(
    module: T, newValue: T['default']): void

  stub<T extends object, K extends keyof T & string>(
    module: T, exportName: K, newValue: T[K]): void

  stub(module: any, arg1: any, arg2?: any): void {
    if (arg2 === undefined) {
      this._stub(module, 'default', arg1)
    } else {
      this._stub(module, arg1, arg2)
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
