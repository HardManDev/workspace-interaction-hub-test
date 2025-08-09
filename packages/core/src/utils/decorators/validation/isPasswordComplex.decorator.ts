/* eslint-disable indent */
import type { ValidationArguments } from 'class-validator'
import { registerDecorator } from 'class-validator'

let passwordComplexityEnabled = true

export const setPasswordComplexityEnabled = (enabled: boolean): void => {
    passwordComplexityEnabled = enabled
}

interface IsPasswordComplexOptions {
    message?: string
    context?: Record<string, any>
}

export const IsPasswordComplex =
    (options: IsPasswordComplexOptions = {}) =>
    (object: Object, propertyName: string): void => {
        registerDecorator({
            target: object.constructor,
            propertyName,
            options: {
                message:
                    options.message ||
                    'Password must contain at least 3 of the following: lowercase letter, uppercase letter, number, special character',
                context: options.context
            },
            validator: {
                validate(value: any) {
                    if (!passwordComplexityEnabled) {
                        return true
                    }

                    if (value === null || value === '') {
                        return true
                    }

                    const rules = [
                        /[a-z]/.test(value),
                        /[A-Z]/.test(value),
                        /[0-9]/.test(value),
                        /[^A-Za-z0-9]/.test(value)
                    ]
                    return rules.filter(Boolean).length >= 3
                },
                defaultMessage(args: ValidationArguments) {
                    return args.constraints[1] || 'Password complexity validation failed'
                }
            }
        })
    }
