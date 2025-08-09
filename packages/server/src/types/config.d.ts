export type ApplicationConfig = {
    isDevelopment: boolean
    port: number
    postgres: {
        host: string
        port: number
        user: string
        password: string
        db: string
        ttl: number
    }
    rateLimit: {
        '/auth/login': {
            windowMs: number
            limit: number
        }
    }
    session: {
        secret: string
        cookie: {
            httpOnly: boolean
            secure: boolean
            sameSite: boolean | 'lax' | 'strict' | 'none' | undefined
            path: string
            maxAge: number
        }
    }
}
