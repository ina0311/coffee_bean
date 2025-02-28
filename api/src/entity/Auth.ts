import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, BeforeInsert, BeforeUpdate } from 'typeorm'
import { User } from './User'
import { createHash } from 'node:crypto'

@Entity('auths')
export class Auth {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  password_hash: string

  @Column({ nullable: true })
  last_login_at: Date

  @Column({ nullable: true })
  refresh_token: string

  @Column({ nullable: true })
  refresh_token_expires_at: Date

  @OneToOne(() => User)
  @JoinColumn()
  user: User

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password_hash) {
      this.password_hash = createHash('sha256').update(this.password_hash).digest('hex')
    }
  }

  async comparePassword(password: string): Promise<boolean> {
    return createHash('sha256').update(password).digest('hex') === this.password_hash
  }
} 