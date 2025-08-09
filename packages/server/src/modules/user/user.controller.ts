import { Body, Controller, Post } from '@nestjs/common'
import {
    CreateUserDto,
    IHttpErrorViewModel,
    IUserController,
    UserEntityViewModel
} from '@workspace-interaction-hub/core'

import { UserService } from './user.service'

@Controller('user')
export class UserController implements IUserController {
    public constructor(private readonly userService: UserService) {}

    @Post('create')
    public async createUser(@Body() createUserDto: CreateUserDto): Promise<UserEntityViewModel | IHttpErrorViewModel> {
        const newUser = await this.userService.createUser(createUserDto)

        return UserEntityViewModel.expose(newUser)
    }
}
