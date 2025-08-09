export const FetchStatus = {
    PENDING: 'pending',
    SUCCESS: 'success',
    ERROR: 'error',
    NETWORK_ERROR: 'networkError'
} as const

// eslint-disable-next-line no-redeclare
export type FetchStatus = (typeof FetchStatus)[keyof typeof FetchStatus]
