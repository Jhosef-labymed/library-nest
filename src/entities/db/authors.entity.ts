import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Authors')
export class Authors {
  @PrimaryGeneratedColumn()
  authorId: number;

  @Column('varchar', { nullable: false, length: 250 })
  author: string;

  @Column('datetime', { nullable: true, default: new Date().toISOString() })
  createdAt: Date;
}
