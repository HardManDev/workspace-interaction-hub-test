/* eslint-disable indent */
import type { ValidationOptions } from 'class-validator'
import { registerDecorator } from 'class-validator'

export const IsEnumValueDecorator =
    <TEnum extends object>(enumType: TEnum, validationOptions?: ValidationOptions) =>
    (object: object, propertyName: string): void => {
        const defaultMessage = `Value must be a valid enum value from ${Object.keys(enumType).join(', ')}`

        registerDecorator({
            name: 'isEnumValue',
            target: object.constructor,
            propertyName: propertyName,
            options: {
                ...validationOptions,
                message: validationOptions?.message || defaultMessage
            },
            validator: {
                validate(value: any) {
                    const enumValues = Object.values(enumType)
                    return typeof value === 'string' && enumValues.includes(value)
                }
            }
        })
    }
