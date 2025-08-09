import type { IUserController, IUserEntity } from '@workspace-interaction-hub/core'

export interface IUserService extends IUserController {
    getUserById(id: string): Promise<IUserEntity | null>
    getUserByUsername(username: string): Promise<IUserEntity | null>
}
