import type { IBaseEntity } from './base.entity'

export interface IUserEntity extends IBaseEntity {
    /**
     * User name
     */
    username: string
    /**
     * User password
     */
    password: string
}
