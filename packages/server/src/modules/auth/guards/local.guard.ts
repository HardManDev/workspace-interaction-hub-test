import type { Request } from 'express'
import { AuthGuard } from '@nestjs/passport'
import { ExecutionContext, Injectable } from '@nestjs/common'

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
    public constructor() {
        super()
    }

    public async canActivate(context: ExecutionContext): Promise<boolean> {
        await super.canActivate(context)

        const request = context.switchToHttp().getRequest() as Request

        await super.logIn(request)

        return true
    }
}
