import type { Request } from 'express'

import type { IHttpErrorViewModel, ILoginDto, IUserEntityViewModel } from '../../../models'
import type { IUserEntity } from '../../../entities'

export interface IAuthController {
    login(loginDto: ILoginDto, user?: IUserEntity): Promise<IUserEntityViewModel | IHttpErrorViewModel>
    logout(req?: Request, user?: IUserEntity): Promise<boolean | IHttpErrorViewModel>

    auth(user?: IUserEntity): Promise<IUserEntityViewModel | IHttpErrorViewModel>
}
