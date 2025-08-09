export const HttpMethod = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
    PATCH: 'PATCH',
    HEAD: 'HEAD',
    OPTIONS: 'OPTIONS'
} as const

// eslint-disable-next-line no-redeclare
export type HttpMethod = (typeof HttpMethod)[keyof typeof HttpMethod]
