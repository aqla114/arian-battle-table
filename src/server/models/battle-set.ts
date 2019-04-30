import { CreateDateColumn, Index, PrimaryGeneratedColumn, UpdateDateColumn, OneToMany, Entity, Column } from 'typeorm';
import { Character } from './character';

@Entity('battle_set')
export class BattleSet {
    @PrimaryGeneratedColumn()
    id!: number;

    @CreateDateColumn({
        name: 'created_at',
    })
    @Index()
    createdAt!: Date;

    @UpdateDateColumn({
        name: 'updated_at',
    })
    @Index()
    updatedAt!: Date;

    @OneToMany(type => Character, character => character.battleSet)
    characters!: Character[];

    @Column()
    name!: string;
}
