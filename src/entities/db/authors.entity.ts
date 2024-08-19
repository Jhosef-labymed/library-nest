import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Authors')
export class Authors {
  @PrimaryGeneratedColumn()
  authorId: number;

  @Column('varchar', { nullable: false, length: 250 })
  author: string;

  @Column('datetime')
  createdAt: Date;
}
