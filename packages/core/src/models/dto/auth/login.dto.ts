import { IsNotEmpty, IsString } from 'class-validator'
import { Expose, Transform } from 'class-transformer'

import { ExposableClass, trimValue } from '../../../utils'
import { ILoginDto } from '../../../types'

export enum LoginDtoValidationErrorTokens {
    USERNAME_IS_REQUIRED = 'loginDto.username_is_required',
    PASSWORD_IS_REQUIRED = 'loginDto.password_is_required'
}

export class LoginDto extends ExposableClass implements ILoginDto {
    @IsString()
    @IsNotEmpty({ context: { errorCode: LoginDtoValidationErrorTokens.USERNAME_IS_REQUIRED } })
    @Transform(trimValue)
    @Expose()
    public readonly username: string
    @IsString()
    @IsNotEmpty({ context: { errorCode: LoginDtoValidationErrorTokens.PASSWORD_IS_REQUIRED } })
    @Transform(trimValue)
    @Expose()
    public readonly password: string
}
