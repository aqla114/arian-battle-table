import { CreateDateColumn, Index, PrimaryGeneratedColumn, UpdateDateColumn, ManyToOne, Column, Entity } from 'typeorm';
import { BattleSession } from './battle-session';

export type CharacterWithoutId = Pick<
    Character,
    | 'name'
    | 'actionPriority'
    | 'hp'
    | 'maxHp'
    | 'physicalDefence'
    | 'magicalDefence'
    | 'overwhelmed'
    | 'slipped'
    | 'abstracted'
    | 'frenzied'
    | 'stunned'
    | 'knockback'
    | 'poisoned'
    | 'isActed'
>;

@Entity('character')
export class Character {
    public static mk(
        name: string,
        actionPriority: number,
        hp: number,
        maxHp: number,
        physicalDefence: number,
        magicalDefence: number,
    ): Character {
        const c = new Character();
        return Object.assign(c, {
            name,
            actionPriority,
            hp,
            maxHp,
            physicalDefence,
            magicalDefence,
            isActed: false,
            overwhelmed: false,
            slipped: false,
            abstracted: false,
            frenzied: false,
            stunned: false,
            knockback: false,
            poisoned: false,
        });
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

    @Column({ default: 0, name: 'max_hp' })
    maxHp!: number;

    @Column({ default: 0, name: 'physical_defence' })
    physicalDefence!: number;

    @Column({ default: 0, name: 'magical_defence' })
    magicalDefence!: number;

    @Column({ default: 0, name: 'overwhelmed' })
    overwhelmed!: boolean;

    @Column({ default: 0, name: 'slipped' })
    slipped!: boolean;

    @Column({ default: 0, name: 'abstracted' })
    abstracted!: boolean;

    @Column({ default: 0, name: 'frenzied' })
    frenzied!: boolean;

    @Column({ default: 0, name: 'stunned' })
    stunned!: boolean;

    @Column({ default: 0, name: 'knockback' })
    knockback!: boolean;

    @Column({ default: 0, name: 'poisoned' })
    poisoned!: boolean;

    @Column({ default: 0, name: 'is_acted' })
    isActed!: boolean;
}
