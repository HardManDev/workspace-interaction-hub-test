import type { ValidationError } from 'class-validator'

export class ObjectValidationError extends Error {
    public readonly errorTokens: Array<string>
    public readonly errors: Array<ValidationError>

    public constructor(message: string, errors: Array<ValidationError>) {
        super(message)

        this.errors = errors

        this.errorTokens = errors.map((error: ValidationError) => {
            if (!error.contexts) {
                return ''
            }

            for (const key in error.contexts) {
                const context = error.contexts[key]
                if (typeof context === 'object' && context !== null && 'errorCode' in context) {
                    return context.errorCode
                }
            }

            return ''
        })
    }

    public checkErrorToken(token: string): boolean {
        return this.errorTokens.includes(token)
    }

    public resolveActionByToken(token: string, action: () => void): void {
        if (this.checkErrorToken(token)) {
            action()
        }
    }
}
