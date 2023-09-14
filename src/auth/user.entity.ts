import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import { Classroom } from '../class-files/classroom.entity';
import { File } from '../class-files/file.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  userType: string;

  // @OneToMany(() => Classroom, (classroom) => classroom.tutor)
  // classrooms: Classroom[];

  // @ManyToMany(() => Classroom, (classroom) => classroom.students)
  // enrolledClassrooms: Classroom[];

  // @OneToMany(() => File, (file) => file.uploadedBy)
  // uploadedFiles: File[];
}
