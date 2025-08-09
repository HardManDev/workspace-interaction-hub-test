import { useState } from 'react'
import { type ExposableClass, HttpErrorViewModel, type IHttpErrorViewModel } from '@workspace-interaction-hub/core'

import type { UseApiHook } from '../types/hooks/useApi'
import { FetchStatus } from '../types/enums/fetchStatus'

export const useApi = <TResponse extends ExposableClass>(
    callback: () => Promise<TResponse | IHttpErrorViewModel>
): UseApiHook<TResponse> => {
    const [data, setData] = useState<TResponse | undefined>(undefined)
    const [error, setError] = useState<Error | IHttpErrorViewModel | undefined>(undefined)
    const [status, setStatus] = useState<FetchStatus | undefined>(undefined)

    const fetch = async () => {
        setStatus(FetchStatus.PENDING)

        try {
            const result = await callback()

            if (result instanceof HttpErrorViewModel) {
                setStatus(FetchStatus.ERROR)
                setError(result)

                return result
            }

            setStatus(FetchStatus.SUCCESS)
            setData(result as TResponse)

            return result
        } catch (err) {
            if (err instanceof Error && err.message === 'Failed to fetch') {
                setStatus(FetchStatus.NETWORK_ERROR)
                setError(err)

                throw err
            }

            setStatus(FetchStatus.ERROR)
            setError(err as Error)
            throw err
        }
    }

    return {
        data,
        error,
        status,
        fetch
    }
}
