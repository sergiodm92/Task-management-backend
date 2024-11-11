import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Task } from '@modules/tasks/tasks.entity';
import { OneToMany } from 'typeorm';
import { Tag } from '@modules/tags/tags.entity';

@Entity('users')
class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @OneToMany(() => Task, (task) => task.user, { nullable: true })
  tasks?: Task[];

  @OneToMany(() => Tag, (tag) => tag.user, { nullable: true })
  tags?: Tag[];
}

export default User;
