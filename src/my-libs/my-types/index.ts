export type FilterProps<T, U> = { [K in keyof T]: T[K] extends U ? K : never }[keyof T]

export type MethodsNames<T> = FilterProps<T, Function>
