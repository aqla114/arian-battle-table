import { CreateDateColumn, Index, PrimaryGeneratedColumn, UpdateDateColumn, ManyToOne, Column, Entity } from 'typeorm';
import { BattleSet } from './battle-set';

@Entity('character')
export class Character {
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

    @ManyToOne(type => BattleSet, battleSet => battleSet.characters)
    battleSet!: BattleSet;

    @Column({ default: '' })
    name!: string;

    @Column({ default: 0, name: 'action_priority' })
    actionPriority!: number;

    @Column({ default: 0, name: 'hp' })
    hp!: number;

    @Column({ default: 0, name: 'physical_defence' })
    physicalDefence!: number;

    @Column({ default: 0, name: 'magical_defence' })
    magicalDefence!: number;
}
