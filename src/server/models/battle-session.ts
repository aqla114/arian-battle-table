import { CreateDateColumn, Index, PrimaryGeneratedColumn, UpdateDateColumn, OneToMany, Entity, Column } from 'typeorm';
import { Character } from './character';

@Entity('battle_session')
export class BattleSession {
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

    @Column({
        name: 'session_name',
    })
    sessionName!: string;

    @OneToMany(type => Character, character => character.battleSession)
    characters!: Character[];
}
