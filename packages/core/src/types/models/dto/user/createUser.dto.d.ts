import type { IUserEntity } from '../../../entities'

export interface ICreateUserDto extends Pick<IUserEntity, 'username' | 'password'> {}
