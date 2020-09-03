import {
    CreateDateColumn,
    Index,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    ManyToOne,
    Column,
    Entity,
    OneToOne,
} from 'typeorm';
import { BattleSession } from './battle-session';
import { BadStatus } from './bad-status';

export type CharacterWithoutId = Pick<
    Character,
    'name' | 'actionPriority' | 'hp' | 'maxHp' | 'physicalDefence' | 'magicalDefence' | 'badStatus' | 'isActed'
>;

@Entity('character')
export class Character {
    public static mk(
        name: string,
        attribute: string,
        actionPriority: number,
        defaultActionPriority: number,
        hp: number,
        maxHp: number,
        physicalDefence: number,
        defaultPhysicalDefence: number,
        magicalDefence: number,
        defaultMagicalDefence: number,
    ): Character {
        const c = new Character();
        return Object.assign(c, {
            name,
            attribute,
            actionPriority,
            defaultActionPriority,
            hp,
            maxHp,
            physicalDefence,
            defaultPhysicalDefence,
            magicalDefence,
            defaultMagicalDefence,
            badStatus: BadStatus.mk(),
            isActed: false,
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

    @ManyToOne(
        type => BattleSession,
        battleSession => battleSession.characters,
    )
    battleSession!: BattleSession;

    @Column({ default: '' })
    name!: string;

    @Column({ default: 'None' })
    attribute!: string;

    @Column({ default: 0, name: 'action_priority' })
    actionPriority!: number;

    @Column({ default: 0, name: 'default_action_priority' })
    defaultActionPriority!: number;

    @Column({ default: 0, name: 'hp' })
    hp!: number;

    @Column({ default: 0, name: 'max_hp' })
    maxHp!: number;

    @Column({ default: 0, name: 'physical_defence' })
    physicalDefence!: number;

    @Column({ default: 0, name: 'default_physical_defence' })
    defaultPhysicalDefence!: number;

    @Column({ default: 0, name: 'magical_defence' })
    magicalDefence!: number;

    @Column({ default: 0, name: 'default_magical_defence' })
    defaultMagicalDefence!: number;

    @Column({ default: 0, name: 'is_acted' })
    isActed!: boolean;

    @OneToOne(
        type => BadStatus,
        badStatus => badStatus.character,
        { cascade: true },
    )
    badStatus!: BadStatus;
}
