import type { IBaseEntity } from './base.entity'
import type { IUserEntity } from './user.entity'
import type { IMessageEntity } from './message.entity'

export interface IChatEntity extends IBaseEntity {
    users: Array<IUserEntity>
    messages: Array<IMessageEntity>
}
