import type { IUserEntity } from '../../../entities'

export interface IUserEntityViewModel extends Omit<IUserEntity, 'password'> {}
