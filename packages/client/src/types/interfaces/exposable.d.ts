import type { ExposableClass } from '@workspace-interaction-hub/core'

export interface IExposable<T extends ExposableClass> {
    expose(plain: object): T
    exposeArray(plain: Array<object>): Array<T>
}
