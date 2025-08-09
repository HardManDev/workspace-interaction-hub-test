import { AfterInsert, Column, Entity } from 'typeorm'
import { IUserEntity } from '@workspace-interaction-hub/core'
import { Logger } from '@nestjs/common'

import { BaseEntity } from '../../../entities/base.entity'

@Entity('users')
export class UserEntity extends BaseEntity implements IUserEntity {
    @Column({ unique: true })
    public username: string
    @Column({ nullable: false })
    public password: string

    @AfterInsert()
    private logNewUser(): void {
        new Logger('UserEntity').debug(
            `Created new user entity: ${JSON.stringify({
                ...this,
                password: '***'
            })}`
        )
    }
}
