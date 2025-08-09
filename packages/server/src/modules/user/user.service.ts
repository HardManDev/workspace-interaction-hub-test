import { ConflictException, Injectable, Logger, NotFoundException } from '@nestjs/common'
import { ICreateUserDto, IHttpErrorViewModel, IUserEntity, IUserEntityViewModel } from '@workspace-interaction-hub/core'

import { IUserService } from './types/interfaces/user.service'
import { UserRepository } from './repositories/user.repository'

@Injectable()
export class UserService implements IUserService {
    private readonly logger = new Logger('UserService')

    public constructor(private readonly userRepository: UserRepository) {}

    public async createUser(createUserDto: ICreateUserDto): Promise<IUserEntityViewModel | IHttpErrorViewModel> {
        const existUser = await this.userRepository.findByUsername(createUserDto.username)

        if (existUser) {
            this.logger.warn('Attempt to create user with duplicate username')
            this.logger.debug(
                `User ${JSON.stringify({ username: createUserDto.username })} already exist. \n${JSON.stringify({
                    ...existUser,
                    password: '***'
                })}`
            )

            throw new ConflictException(`User ${JSON.stringify({ username: createUserDto.username })} already exist.`)
        }

        const newUser = await this.userRepository.createUser(createUserDto)

        this.logger.log(`Created a new user: ${JSON.stringify({ id: newUser.id, username: newUser.username })}`)

        return newUser
    }

    public async getUserById(id: string): Promise<IUserEntity | null> {
        const targetUser = await this.userRepository.findById(id)

        if (!targetUser) {
            throw new NotFoundException(`User with id: "${id}" not found.`)
        }

        return targetUser
    }

    public async getUserByUsername(username: string): Promise<IUserEntity | null> {
        const targetUser = await this.userRepository.findByUsername(username)

        if (!targetUser) {
            throw new NotFoundException(`User with username: "${username}" not found.`)
        }

        return targetUser
    }
}
