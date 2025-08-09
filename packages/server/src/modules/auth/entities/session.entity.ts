import { ISessionEntity } from '@workspace-interaction-hub/core/src/types/entities/session.entity'
import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm'

@Entity('sessions')
export class SessionEntity implements ISessionEntity {
    @PrimaryColumn({ type: 'varchar', collation: 'default' })
    public readonly sid: string

    @Column({ type: 'json' })
    public readonly sess: Record<string, any>

    @Column({ type: 'timestamp', precision: 6 })
    public readonly expire: Date

    @CreateDateColumn({ type: 'timestamptz' })
    public readonly createdAt: Date
}
