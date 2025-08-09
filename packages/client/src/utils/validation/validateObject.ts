import type { ExposableClass } from '@workspace-interaction-hub/core'
import { validate } from 'class-validator'

import { ObjectValidationError } from '../../errors/objectValidationError'
import type { IExposable } from '../../types/interfaces/exposable'

export const validateObject = async <TObject extends ExposableClass, TConstructor extends IExposable<TObject>>(
    ctor: TConstructor,
    object: object
): Promise<void | never> => {
    const validationErrors = await validate(ctor.expose(object))

    if (validationErrors && validationErrors.length > 0) {
        throw new ObjectValidationError('Request body validation failed', validationErrors)
    }
}
