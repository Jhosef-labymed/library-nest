import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Books')
export class Books {
  @PrimaryGeneratedColumn()
  bookId: number;

  @Column('varchar', { nullable: false, length: 250 })
  title: string;

  @Column('varchar', { nullable: false, length: 50 })
  isbn: string;

  @Column({ nullable: false })
  genreId: number;

  @Column({ nullable: false })
  authorId: number;

  @Column('datetime', { nullable: false })
  publicationDate: Date;

  @Column('bit', { nullable: false })
  borrowed: boolean;

  @Column('datetime', { nullable: true })
  createdAt: Date;
}
