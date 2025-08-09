import type { TransformFnParams } from 'class-transformer'

/**
 * A class-transformer transform function that trims leading and trailing whitespace from string values.
 *
 * @param value - The value passed by class-transformer's Transform context
 * @returns The trimmed string if the value is a string; otherwise, returns the original value unchanged.
 *
 * @example
 * ```ts
 * @Transform(trimValue)
 * username: string;
 * ```
 */
export const trimValue = ({ value }: TransformFnParams): string => {
    return typeof value === 'string' ? value.trim() : value
}
