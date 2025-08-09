import { Injectable, Logger, NotFoundException } from '@nestjs/common'
import { ILoginDto, IUserEntity } from '@workspace-interaction-hub/core'
import { compare } from 'bcrypt-ts'

import { IAuthService } from './types/interfaces/auth.service'
import { UserService } from '../user/user.service'

@Injectable()
export class AuthService implements IAuthService {
    private readonly logger = new Logger('AuthService')

    public constructor(private readonly userService: UserService) {}

    public async validateUserByPassword(loginDto: ILoginDto): Promise<IUserEntity | null> {
        const targetUser = await this.userService.getUserByUsername(loginDto.username)

        if (!targetUser) {
            throw new NotFoundException(`User with username: "${loginDto.username}" not found.`)
        }

        const isValidPassword = await compare(loginDto.password, targetUser.password)

        if (!isValidPassword) {
            this.logger.warn(
                `User ${JSON.stringify({ id: targetUser.id, username: targetUser.username })}` +
                    ' has an unsuccessful attempt to login (Invalid password)'
            )
        }

        return isValidPassword ? targetUser : null
    }
}
