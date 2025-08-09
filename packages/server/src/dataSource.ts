import * as path from 'node:path'
import type { TypeOrmModuleOptions } from '@nestjs/typeorm'
import type { DataSourceOptions } from 'typeorm'
import { DataSource } from 'typeorm'

import { config } from './constants'

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: config.postgres.host,
    port: config.postgres.port,
    username: config.postgres.user,
    password: config.postgres.password,
    database: config.postgres.db,
    entities: [path.join(__dirname, '/**/*.entity.js')],
    migrations: [path.join(__dirname, '/migrations/*.js')],
    synchronize: config.isDevelopment
}

export const AppDataSource = new DataSource(typeOrmConfig as DataSourceOptions)
