export interface IBaseEntity {
    /**
     * A unique identifier for the entity
     */
    readonly id: string

    /**
     * The timestamp when the entity was created
     */
    readonly createdAt: Date

    /**
     * The timestamp when the entity was last updated
     * Can be null if the entity was never updated after creation
     */
    updatedAt: Date | null
}
