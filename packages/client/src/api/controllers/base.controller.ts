import { type ExposableClass, HttpErrorViewModel, type IHttpErrorViewModel } from '@workspace-interaction-hub/core'

import type { IExposable } from '../../types/interfaces/exposable'
import type { HttpMethod } from '../../types/enums/httpMethod'
import { joinUrl } from '../../utils/joinUrl.ts'

const API_BASE_URL = (import.meta as any).env.VITE_API_BASE_URL

export abstract class BaseController {
    protected async fetch<
        TRequestBody extends object,
        TResponse extends ExposableClass,
        TResponseConstructor extends IExposable<TResponse>
    >(
        url: string,
        method: HttpMethod,
        request: {
            body?: TRequestBody
        },
        constructor?: {
            response?: TResponseConstructor
        }
    ): Promise<TResponse | IHttpErrorViewModel> {
        const response = await fetch(joinUrl(API_BASE_URL, url), {
            method,
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: request.body ? JSON.stringify(request.body) : undefined
        })

        if (!String(response.status).startsWith('2')) {
            return HttpErrorViewModel.expose(await response.json())
        }

        if (constructor && constructor.response) {
            return constructor.response.expose(await response.json())
        }

        return await response.json()
    }
}
