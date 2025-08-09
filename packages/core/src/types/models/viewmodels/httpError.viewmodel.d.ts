export interface IHttpErrorViewModel {
    /**
     * HTTP error message text.
     */
    readonly message: string
    /**
     * HTTP error name.
     */
    readonly error: string
    /**
     * HTTP error status code.
     */
    readonly statusCode: number
}
