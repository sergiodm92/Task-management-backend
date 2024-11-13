import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import User from '@modules/auth/auth.entity';
import { Tag } from '@modules/tags/tags.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'date', nullable: true })
  dueDate: Date;

  @Column({ type: 'text', default: 'pending' })
  status: string;

  @ManyToOne(() => User, (user) => user.tasks, { onDelete: 'CASCADE' })
  user: User;

  @ManyToMany(() => Tag, (tag) => tag.tasks, { nullable: true })
  @JoinTable()
  tags?: Tag[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
