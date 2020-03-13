export default class Mooca {

  private _moduleToExport: Map<any, Map<string, any>> = new Map()

  stub<T extends { default: any }>(
    module: T, stubbedValue: T['default']): void

  stub<T extends object, K extends keyof T & string>(
    module: T, exportName: K, stubbedValue: T[K]): void

  stub(module: any, arg1: any, arg2?: any): void {
    if (arg2 === undefined) {
      this._stub(module, 'default', arg1)
    } else {
      this._stub(module, arg1, arg2)
    }
  }

  restore(): void {
    this._moduleToExport.forEach((exportToValue, module) => {
      exportToValue.forEach((originalValue, exportName) => {
        module[exportName] = originalValue
      })
    })
  }

  private _stub<T extends object, K extends keyof T & string>(
    module: T, exportName: K, stubbedValue: T[K]): void {
    let exportToValue = this._moduleToExport.get(module)
    if (exportToValue === undefined) {
      exportToValue = new Map()
      this._moduleToExport.set(module, exportToValue)
    }

    const originalValue = module[exportName]
    exportToValue.set(exportName, originalValue)

    module[exportName] = stubbedValue
  }

}
