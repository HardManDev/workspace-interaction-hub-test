import type { TransformFnParams } from 'class-transformer'

/**
 * A class-transformer transform function that converts a string value to lowercase.
 *
 * @param value - The value provided by class-transformer's Transform context
 * @returns The lowercase version of the string if the value is a string; otherwise, returns the original value unchanged.
 *
 * @example
 * ```ts
 * @Transform(toLowerCaseValue)
 * email: string;
 * ```
 */
export const toLowerCaseValue = ({ value }: TransformFnParams): string => {
    return typeof value === 'string' ? value.toLowerCase() : value
}
