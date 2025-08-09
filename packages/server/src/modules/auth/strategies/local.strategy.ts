import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-local'
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { IUserEntity } from '@workspace-interaction-hub/core'

import { AuthService } from '../auth.service'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
    public constructor(private readonly authService: AuthService) {
        super({
            usernameField: 'username',
            passwordField: 'password'
        })
    }

    public async validate(username: string, password: string): Promise<IUserEntity> {
        try {
            const targetUser = await this.authService.validateUserByPassword({
                username,
                password
            })

            if (!targetUser) {
                throw new UnauthorizedException('Invalid credentials')
            }

            return targetUser
        } catch (e) {
            if (e instanceof NotFoundException) {
                throw new UnauthorizedException('Invalid credentials')
            }

            throw e
        }
    }
}
