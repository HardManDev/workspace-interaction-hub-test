import type { ICreateUserDto, IHttpErrorViewModel, IUserEntityViewModel } from '../../../models'

export interface IUserController {
    /**
     * Creates a new user.
     * @param createUserDto - User entity partial data for create entity.
     * @return User view-model as partial data of user entity.
     */
    createUser(createUserDto: ICreateUserDto): Promise<IUserEntityViewModel | IHttpErrorViewModel>
}
