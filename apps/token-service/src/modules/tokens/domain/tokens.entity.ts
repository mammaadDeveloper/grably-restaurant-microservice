import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TokenStautsEnum } from '../infrastructure/tokens.enum';

@Entity('tokens')
export class TokensEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ nullable: true })
  name?: string;

  @Column()
  token!: string;

  @Column()
  ip!: string;

  @Column()
  userAgent!: string;

  @Column({type: 'enum', enum: TokenStautsEnum, default: TokenStautsEnum.ACTIVE})
  status!: TokenStautsEnum;

  @CreateDateColumn({ name: 'create_at' })
  createdAt!: Date;
}
