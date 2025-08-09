import { Injectable } from '@nestjs/common'
import { DataSource, Repository } from 'typeorm'
import { ICreateUserDto, IUserEntity } from '@workspace-interaction-hub/core'
import { hash } from 'bcrypt-ts'

import { UserEntity } from '../entities/user.entity'

@Injectable()
export class UserRepository extends Repository<UserEntity> {
    public constructor(private readonly dataSource: DataSource) {
        super(UserEntity, dataSource.createEntityManager())
    }

    public async createUser(createUserDto: ICreateUserDto): Promise<IUserEntity> {
        createUserDto.password = await hash(createUserDto.password, 10)

        const newUser = this.create(createUserDto)

        return await this.save(newUser)
    }

    public async findById(id: string): Promise<IUserEntity | null> {
        return await this.findOne({ where: { id } })
    }

    public async findByUsername(username: string): Promise<IUserEntity | null> {
        return await this.findOne({ where: { username } })
    }
}
