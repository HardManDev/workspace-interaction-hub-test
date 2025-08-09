import * as dotenv from 'dotenv'
import * as process from 'node:process'
import * as path from 'node:path'
import { ConfigService } from '@nestjs/config'
import { setPasswordComplexityEnabled } from '@workspace-interaction-hub/core'

import type { ApplicationConfig } from './types/config'

dotenv.config({
    path: path.resolve(process.cwd(), '.env')
})

const configService = new ConfigService()

if (configService.get('DISABLE_PASSWORD_COMPLEXITY_POLICY') === 'true') {
    setPasswordComplexityEnabled(false)
}

export const config: ApplicationConfig = {
    isDevelopment: configService.get('NODE_ENV') === 'development',
    port: Number(configService.get('PORT') ?? 3000),
    postgres: {
        host: configService.get('POSTGRES_HOST') ?? 'localhost',
        port: Number(configService.get('POSTGRES_PORT') ?? 5432),
        user: configService.get('POSTGRES_USER') ?? 'admin',
        password: configService.get('POSTGRES_PASSWORD') ?? 'admin',
        db: configService.get('POSTGRES_DB') ?? 'workspace_interaction_hub',
        ttl: Number(configService.get('SESSION_EXPIRE') ?? 604800)
    },
    rateLimit: {
        '/auth/login': {
            limit: Number(configService.get('RATELIMIT_AUTH_LOGIN_LIMIT') ?? 5),
            windowMs: Number(configService.get('RATELIMIT_AUTH_LOGIN_MS') ?? 15 * 60 * 1000) // 15min
        }
    },
    session: {
        secret: configService.get('SESSION_SECRET') ?? 'session_secret',
        cookie: {
            httpOnly: configService.get('SESSION_COOKIE_HTTPONLY')
                ? Boolean(configService.get('SESSION_COOKIE_HTTPONLY'))
                : configService.get('NODE_ENV') !== 'development',
            secure: configService.get('SESSION_COOKIE_SAMESITE')
                ? Boolean(configService.get('SESSION_COOKIE_SAMESITE'))
                : configService.get('NODE_ENV') !== 'development',
            sameSite: configService.get('SESSION_COOKIE_SAMESITE') ?? 'lax',
            path: configService.get('SESSION_COOKIE_PATH') ?? '/',
            maxAge: Number(configService.get('SESSION_EXPIRE') ?? 604800)
        }
    }
}
