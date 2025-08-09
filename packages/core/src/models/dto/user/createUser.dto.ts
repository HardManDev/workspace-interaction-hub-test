import { Expose, Transform } from 'class-transformer'
import { IsNotEmpty, IsString, Length, Matches } from 'class-validator'

import { ExposableClass, trimValue } from '../../../utils'
import { ICreateUserDto } from '../../../types'
import { IsPasswordComplex } from '../../../utils/decorators/validation/isPasswordComplex.decorator'

export enum CreateUserDtoValidationErrorToken {
    USERNAME_IS_REQUIRED = 'createUserDto.username_is_required',
    USERNAME_LENGTH_IS_INVALID = 'createUserDto.username_length_is_invalid',
    USERNAME_FORMAT_IS_INVALID = 'createUserDto.username_format_is_invalid',
    PASSWORD_IS_REQUIRED = 'createUserDto.password_is_required',
    PASSWORD_LENGTH_IS_INVALID = 'createUserDto.password_length_is_invalid',
    PASSWORD_COMPLEXITY_IS_INVALID = 'createUserDto.password_complexity_is_invalid'
}

export class CreateUserDto extends ExposableClass implements ICreateUserDto {
    @IsString()
    @IsNotEmpty({ context: { errorCode: CreateUserDtoValidationErrorToken.USERNAME_IS_REQUIRED } })
    @Length(2, 128, { context: { errorCode: CreateUserDtoValidationErrorToken.USERNAME_LENGTH_IS_INVALID } })
    @Matches(/^[a-zA-Z0-9_]+$/, {
        message: 'Username can contain only Latin letters, digits, underscore',
        context: { errorCode: CreateUserDtoValidationErrorToken.USERNAME_FORMAT_IS_INVALID }
    })
    @Transform(trimValue)
    @Expose()
    public readonly username: string
    @IsString()
    @IsNotEmpty({ context: { errorCode: CreateUserDtoValidationErrorToken.PASSWORD_IS_REQUIRED } })
    @Length(8, 128, { context: { errorCode: CreateUserDtoValidationErrorToken.PASSWORD_LENGTH_IS_INVALID } })
    @IsPasswordComplex({
        message:
            'Password must contain at least 3 of the following: lowercase letter, uppercase letter, number, special character',
        context: { errorCode: CreateUserDtoValidationErrorToken.PASSWORD_COMPLEXITY_IS_INVALID }
    })
    @Transform(trimValue)
    @Expose()
    public readonly password: string
}
