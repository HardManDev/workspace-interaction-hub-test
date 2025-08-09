import { Expose } from 'class-transformer'

import { ExposableClass } from '../../utils'
import { IEntityViewModel } from '../../types'

export abstract class EntityViewModel extends ExposableClass implements IEntityViewModel {
    @Expose()
    public readonly id: string

    @Expose()
    public readonly createdAt: Date
    @Expose()
    public updatedAt: Date | null
}
