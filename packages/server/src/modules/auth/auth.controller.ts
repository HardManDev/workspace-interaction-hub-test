import {
    Body,
    Controller,
    Get,
    InternalServerErrorException,
    Logger,
    Post,
    Req,
    UnauthorizedException,
    UseGuards
} from '@nestjs/common'
import { IAuthController, IHttpErrorViewModel, LoginDto, UserEntityViewModel } from '@workspace-interaction-hub/core'
import type { Request } from 'express'

import { AuthService } from './auth.service'
import { UserEntity } from '../user/entities/user.entity'
import { AuthorizedUser } from './decorators/authorizedUser.decorator'
import { LocalAuthGuard } from './guards/local.guard'
import { AuthGuard } from './guards/auth.guard'

@Controller('auth')
export class AuthController implements IAuthController {
    private readonly logger = new Logger('AuthService')

    public constructor(private readonly authService: AuthService) {}

    // eslint-disable-next-line require-await
    @Post('login')
    @UseGuards(LocalAuthGuard)
    public async login(
        @Body() loginDto: LoginDto,
        @AuthorizedUser() user: UserEntity
    ): Promise<UserEntityViewModel | IHttpErrorViewModel> {
        this.logger.log(
            `User ${JSON.stringify({
                id: user.id,
                username: user.username
            })} successfully login`
        )
        this.logger.debug(
            JSON.stringify({
                ...user,
                password: '***'
            })
        )

        return UserEntityViewModel.expose(user)
    }

    @Post('logout')
    @UseGuards(AuthGuard)
    public async logout(
        @Req() req?: Request,
        @AuthorizedUser() user?: UserEntity
    ): Promise<boolean | IHttpErrorViewModel> {
        if (!req || !user) {
            throw new InternalServerErrorException()
        }

        const logoutError = await new Promise(resolve => req.logOut({ keepSessionInfo: true }, error => resolve(error)))

        if (logoutError) {
            throw new InternalServerErrorException('Could not logout user')
        }

        this.logger.log(`User ${JSON.stringify({ id: user.id, username: user.username })} logout`)
        this.logger.debug(`Invalidate token: ${req.cookies['connect.sid']}`)

        return true
    }

    // eslint-disable-next-line require-await
    @Get('auth')
    @UseGuards(AuthGuard)
    public async auth(@AuthorizedUser() user?: UserEntity): Promise<UserEntityViewModel | IHttpErrorViewModel> {
        if (!user) {
            throw new UnauthorizedException()
        }
        return UserEntityViewModel.expose(user)
    }
}
