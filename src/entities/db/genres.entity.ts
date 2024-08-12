import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Genres')
export class Genres {
  @PrimaryGeneratedColumn()
  genreId: number;  

  @Column('varchar', { nullable: false, length: 10 })
  code: string;

  @Column('varchar', { nullable: false, length: 50 })
  genre: string;

  @Column('datetime', { nullable: true })
  createdAt: Date;
}
