import type { IBaseEntity } from '@workspace-interaction-hub/core'
import { BeforeUpdate, Column, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm'

export abstract class BaseEntity implements IBaseEntity {
    @PrimaryGeneratedColumn('uuid')
    public readonly id: string

    @CreateDateColumn({ type: 'timestamptz' })
    public readonly createdAt: Date
    @Column({
        type: 'timestamptz',
        nullable: true,
        default: null
    })
    public updatedAt: Date | null

    @BeforeUpdate()
    private updateTimestamp(): void {
        this.updatedAt = new Date()
    }
}
