import { NestFactory } from '@nestjs/core'
import { Logger, ValidationPipe } from '@nestjs/common'
import * as cookieParser from 'cookie-parser'

import { AppModule } from './app.module'
import { config } from './constants'

const logger = new Logger('Main')

const bootstrap = async () => {
    const app = await NestFactory.create(AppModule, {
        // TODO: Use in production mode strict CORS
        cors: {
            origin: true,
            credentials: true
        }
    })

    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            whitelist: true,
            forbidNonWhitelisted: false
        })
    )

    app.use(cookieParser())

    await app.listen(config.port)

    logger.log(`Server is running on port ${config.port}`)
}

;(async () => {
    await bootstrap()
})()
