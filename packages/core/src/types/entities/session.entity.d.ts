export interface ISessionEntity {
    readonly sid: string
    readonly sess: Record<string, any>
    readonly expire: Date
    readonly createdAt: Date
}
