import { Expose } from 'class-transformer'

import { ExposableClass } from '../../utils'
import { IHttpErrorViewModel } from '../../types'

export class HttpErrorViewModel extends ExposableClass implements IHttpErrorViewModel {
    @Expose()
    public readonly message: string

    @Expose()
    public readonly error: string

    @Expose()
    public readonly statusCode: number
}
