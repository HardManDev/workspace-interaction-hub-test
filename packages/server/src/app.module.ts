import { Module } from '@nestjs/common'

import { UserModule } from './modules/user/user.module'
import { DatabaseModule } from './database.module'
import { AuthModule } from './modules/auth/auth.module'

@Module({
    imports: [DatabaseModule, UserModule, AuthModule]
})
export class AppModule {}
