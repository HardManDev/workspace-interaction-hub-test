import type { ExposableClass } from '@workspace-interaction-hub/core'
import { useState } from 'react'

import { ObjectValidationError } from '../errors/objectValidationError.ts'
import type { IExposable } from '../types/interfaces/exposable'
import { validateObject } from '../utils/validation/validateObject.ts'

export interface ObjectValidationHook {
    error?: ObjectValidationError | null
    validate: () => Promise<boolean | never>
}

export const useObjectValidation = <TObject extends ExposableClass>(
    ctor: IExposable<TObject>,
    object: object
): ObjectValidationHook => {
    const [error, setError] = useState<ObjectValidationError | undefined | null>(undefined)

    const validate = async () => {
        try {
            await validateObject(ctor, object)
            setError(null)
            return true
        } catch (err) {
            if (err instanceof ObjectValidationError) {
                setError(err)
                return false
            }

            throw err
        }
    }

    return {
        error,
        validate
    }
}
