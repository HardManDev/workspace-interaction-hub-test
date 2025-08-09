import type { IUserEntity } from '../../../entities'

export interface ILoginDto extends Pick<IUserEntity, 'username' | 'password'> {}
