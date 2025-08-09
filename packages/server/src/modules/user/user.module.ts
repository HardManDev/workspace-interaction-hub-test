import { Module } from '@nestjs/common'
import { getDataSourceToken, TypeOrmModule } from '@nestjs/typeorm'
import { DataSource } from 'typeorm'

import { DatabaseModule } from '../../database.module'
import { UserEntity } from './entities/user.entity'
import { UserRepository } from './repositories/user.repository'
import { UserService } from './user.service'
import { UserController } from './user.controller'

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity]), DatabaseModule],
    controllers: [UserController],
    providers: [
        UserService,
        {
            provide: UserRepository,
            inject: [getDataSourceToken()],
            useFactory: (dataSource: DataSource) => new UserRepository(dataSource)
        }
    ],
    exports: [UserService]
})
export class UserModule {}
