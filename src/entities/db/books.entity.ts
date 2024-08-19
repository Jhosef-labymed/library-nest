import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Authors } from './authors.entity';
import { Genres } from './genres.entity';

@Entity('Books')
export class Books {
  @PrimaryGeneratedColumn()
  bookId: number;

  @Column('varchar', { nullable: false, length: 250 })
  title: string;

  @Column('varchar', { nullable: false, length: 50 })
  isbn: string;

  @OneToOne(() => Genres, (genre) => genre.genreId)
  @Column({ nullable: false })
  genreId: number;

  // @ManyToOne(() => Authors, (author) => author.authorId)
  @Column({ nullable: false })
  authorId: number;

  @Column('datetime', { nullable: false })
  publicationDate: Date;

  @Column('bit', { nullable: false })
  borrowed: boolean;

  @Column('datetime', { nullable: true })
  createdAt: Date;
}
