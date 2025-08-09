import { plainToInstance } from 'class-transformer'

/**
 * Abstract base class that provides static utility methods to convert plain objects
 * or arrays of plain objects into instances of derived classes using class-transformer.
 *
 * Classes that extend this base class should be decorated with class-transformer decorators
 * (e.g., @Expose) to properly control which fields are included during transformation.
 */
export abstract class ExposableClass {
    /**
     * Converts a plain JavaScript object into an instance of the derived class,
     * applying class-transformer's `plainToInstance` with options that:
     * - exclude properties not marked with @Expose
     * - do not populate unset class properties
     *
     * @template T - The type of the derived class
     * @param this - The constructor of the derived class
     * @param plain - A plain JavaScript object to convert
     * @returns An instance of the derived class with transformed and validated fields
     */
    public static expose<T extends ExposableClass>(this: new (...args: Array<any>) => T, plain: object): T {
        return plainToInstance(this, plain, {
            excludeExtraneousValues: true,
            exposeUnsetFields: false
        })
    }

    /**
     * Converts an array of plain JavaScript objects into an array of instances
     * of the derived class, using the same transformation options as `expose`.
     *
     * @template T - The type of the derived class
     * @param this - The constructor of the derived class
     * @param plain - An array of plain JavaScript objects to convert
     * @returns An array of instances of the derived class
     */
    public static exposeArray<T extends ExposableClass>(
        this: new (...args: Array<any>) => T,
        plain: Array<object>
    ): Array<T> {
        return plainToInstance(this, plain, {
            excludeExtraneousValues: true,
            exposeUnsetFields: false
        })
    }
}
