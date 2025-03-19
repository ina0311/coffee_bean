import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm'
import type { Flavor as IFlavor } from '@coffee-bean/types'

@Entity('flavors')
export class Flavor implements IFlavor {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    color: string

    @Column({ nullable: true })
    parentId: number | null

    @ManyToOne(() => Flavor, flavor => flavor.parent)
    @JoinColumn({ name: 'parentId' })
    parent: Flavor | null

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}