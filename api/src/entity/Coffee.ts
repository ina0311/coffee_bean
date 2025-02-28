import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm"
import type { Coffee as ICoffee } from "@coffee-bean/common/types/models"

@Entity('coffees')
export class Coffee implements ICoffee {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column("text")
    description: string

    @Column("decimal", { precision: 10, scale: 2 })
    price: number

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date
} 