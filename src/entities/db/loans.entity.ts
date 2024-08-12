import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Loans')
export class Loans {
  @PrimaryGeneratedColumn()
  loanId: number;

  @Column('date', { nullable: false })
  loanDate: Date;

  @Column('date', { nullable: false })
  dueDate: Date;

  @Column('date', { nullable: false })
  returnDate: Date;

  @Column({ nullable: false })
  memberId: number;

  @Column({ nullable: false })
  bookId: number;

  @Column('datetime', { nullable: true })
  createdAt: Date;
}
