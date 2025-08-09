import { Expose } from 'class-transformer'

import { EntityViewModel } from '../entity.viewmodel'
import { IUserEntityViewModel } from '../../../types'

export class UserEntityViewModel extends EntityViewModel implements IUserEntityViewModel {
    @Expose()
    public username: string
}
