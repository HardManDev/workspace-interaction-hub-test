import type { IBaseEntity } from './base.entity'
import type { IUserEntity } from './user.entity'
import type { IChatEntity } from './chat.entity'

export interface IMessageEntity extends IBaseEntity {
    readonly chat: IChatEntity
    readonly author: IUserEntity

    text: string
}
