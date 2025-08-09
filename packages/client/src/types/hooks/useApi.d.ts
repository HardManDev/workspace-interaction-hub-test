import type { ExposableClass, IHttpErrorViewModel } from '@workspace-interaction-hub/core'

import type { FetchStatus } from '../enums/fetchStatus.ts'

export type UseApiHook<TResponse extends ExposableClass> = {
    data: TResponse | undefined
    error: Error | IHttpErrorViewModel | undefined
    status: FetchStatus | undefined
    fetch: () => Promise<TResponse | IHttpErrorViewModel>
}
