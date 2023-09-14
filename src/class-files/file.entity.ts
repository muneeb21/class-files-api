import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class File {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  classroomId: number;

  @Column()
  uploadedBy: number;

  @Column()
  updatedBy: number;

  @Column()
  fileType: string;

  @Column({ nullable: true })
  fileDetails: string;

  // @Column()
  // destination: string;

  @Column({ default: false, nullable: false })
  isArchived: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
