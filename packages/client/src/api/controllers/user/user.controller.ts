import type { CreateUserDto, HttpErrorViewModel, IUserController } from '@workspace-interaction-hub/core'
import { UserEntityViewModel } from '@workspace-interaction-hub/core'

import { BaseController } from '../base.controller.ts'
import { HttpMethod } from '../../../types/enums/httpMethod.ts'

class UserController extends BaseController implements IUserController {
    public constructor() {
        super()
    }

    public async createUser(createUserDto: CreateUserDto): Promise<UserEntityViewModel | HttpErrorViewModel> {
        return await super.fetch(
            'user/create',
            HttpMethod.POST,
            {
                body: createUserDto
            },
            {
                response: UserEntityViewModel
            }
        )
    }
}

export const userController = new UserController()
