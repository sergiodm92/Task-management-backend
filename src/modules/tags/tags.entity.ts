import User from '@modules/auth/auth.entity';
import { Task } from '@modules/tasks/tasks.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany } from 'typeorm';


@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  color: string

  @ManyToMany(() => Task, (task) => task.tags, { nullable: true })
  tasks?: Task[];

  @ManyToOne(() => User, (user) => user.tags, { onDelete: 'CASCADE' })
  user: User;
}
