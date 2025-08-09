import * as passport from 'passport'
import * as session from 'express-session'
import * as connectPgSimple from 'connect-pg-simple'
import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { Pool } from 'pg'
import { PassportModule } from '@nestjs/passport'
import rateLimit from 'express-rate-limit'
import { Request, Response } from 'express'

import { config } from '../../constants'
import { AuthService } from './auth.service'
import { LocalStrategy } from './strategies/local.strategy'
import { SessionSerializer } from './serializers/session.serializaer'
import { AuthController } from './auth.controller'
import { UserModule } from '../user/user.module'

export const PgSession = connectPgSimple(session)

export const pgStore = new PgSession({
    pool: new Pool({
        host: config.postgres.host,
        port: config.postgres.port,
        user: config.postgres.user,
        password: config.postgres.password,
        database: config.postgres.db
    }),
    tableName: 'sessions',
    ttl: config.postgres.ttl
})

@Module({
    imports: [
        PassportModule.register({
            session: true
        }),
        UserModule
    ],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, SessionSerializer],
    exports: [AuthService]
})
export class AuthModule implements NestModule {
    public configure(consumer: MiddlewareConsumer): void {
        const _session = {
            store: pgStore,
            secret: config.session.secret,
            resave: false,
            saveUninitialized: false,
            cookie: config.session.cookie
        }

        consumer
            .apply(session(_session), passport.session())
            .forRoutes('*')
            .apply(
                rateLimit({
                    windowMs: config.rateLimit['/auth/login'].windowMs,
                    limit: config.rateLimit['/auth/login'].limit,
                    handler: (req: Request, res: Response): void => {
                        const ip = req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress

                        new Logger('AuthRateLimit').error(`Too many login attempts from IP: ${ip}`)

                        res.status(429).json({
                            message: 'Too many login attempts, please try again later.',
                            error: 'Too Many Requests',
                            statusCode: 429
                        })
                    },
                    message: 'Too many login attempts, please try again later.'
                }),
                session(_session),
                passport.session()
            )
            .forRoutes('/auth/login')
    }
}
