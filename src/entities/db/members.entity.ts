import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Members')
export class Members {
  @PrimaryGeneratedColumn()
  memberId: number;

  @Column('varchar', { nullable: false, length: 100 })
  memberName: string;

  @Column('varchar', { nullable: false, length: 50 })
  cellNumber: string;

  @Column('varchar', { nullable: false, length: 100 })
  email: string;

  @Column('datetime', { nullable: true })
  createdAt: Date;
}
