import type { IAuthController, ILoginDto, IUserEntity } from '@workspace-interaction-hub/core'

export interface IAuthService extends Omit<IAuthController, 'login' | 'logout' | 'auth'> {
    validateUserByPassword(loginDto: ILoginDto): Promise<IUserEntity | null>
}
