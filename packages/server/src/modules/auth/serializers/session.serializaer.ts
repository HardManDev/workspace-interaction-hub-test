import { Injectable } from '@nestjs/common'
import { PassportSerializer } from '@nestjs/passport'
import { IUserEntity } from '@workspace-interaction-hub/core'

import { UserService } from '../../user/user.service'

@Injectable()
export class SessionSerializer extends PassportSerializer {
    public constructor(private readonly userService: UserService) {
        super()
    }

    public serializeUser(user: IUserEntity, done: (err: Error | null, id: string) => void): void {
        done(null, user.id)
    }

    public async deserializeUser(
        id: string,
        done: (err: Error | null, user: IUserEntity | null) => void
    ): Promise<void> {
        const user = await this.userService.getUserById(id)

        if (!user) {
            done(new Error('Unauthorized'), null)
            return
        }

        done(null, user)
    }
}
