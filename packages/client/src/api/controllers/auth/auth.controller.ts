import type { HttpErrorViewModel, IAuthController, LoginDto } from '@workspace-interaction-hub/core'
import { UserEntityViewModel } from '@workspace-interaction-hub/core'

import { BaseController } from '../base.controller.ts'
import { HttpMethod } from '../../../types/enums/httpMethod.ts'

class AuthController extends BaseController implements IAuthController {
    public constructor() {
        super()
    }

    public async login(loginDto: LoginDto): Promise<UserEntityViewModel | HttpErrorViewModel> {
        return await super.fetch(
            'auth/login',
            HttpMethod.POST,
            {
                body: loginDto
            },
            {
                response: UserEntityViewModel
            }
        )
    }

    public async logout(): Promise<boolean | HttpErrorViewModel> {
        return await super.fetch('auth/logout', HttpMethod.POST, {})
    }

    public async auth(): Promise<UserEntityViewModel | HttpErrorViewModel> {
        return await super.fetch(
            'auth/auth',
            HttpMethod.GET,
            {},
            {
                response: UserEntityViewModel
            }
        )
    }
}

export const authController = new AuthController()
