import { CreateDateColumn, Index, PrimaryGeneratedColumn, UpdateDateColumn, ManyToOne, Column, Entity } from 'typeorm';
import { BattleSession } from './battle-session';

export type CharacterWithoutId = Pick<
    Character,
    'name' | 'actionPriority' | 'hp' | 'physicalDefence' | 'magicalDefence' | 'isKnockBack'
>;

@Entity('character')
export class Character {
    public static mk(
        name: string,
        actionPriority: number,
        hp: number,
        physicalDefence: number,
        magicalDefence: number,
    ): Character {
        const c = new Character();
        return Object.assign(c, { name, actionPriority, hp, physicalDefence, magicalDefence, isKnockBack: false });
    }

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

    @ManyToOne(type => BattleSession, battleSession => battleSession.characters)
    battleSession!: BattleSession;

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

    @Column({ default: 0, name: 'is_knock_back' })
    isKnockBack!: boolean;
}
