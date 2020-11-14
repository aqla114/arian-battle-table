import {
    CreateDateColumn,
    Index,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    ManyToOne,
    Column,
    Entity,
    OneToOne,
    OneToMany,
} from 'typeorm';
import { BattleSession } from './battle-session';
import { BadStatus } from './bad-status';
import { Skill } from './skill';

export type CharacterWithoutId = Omit<Character, 'id'>;

@Entity('characters')
export class Character {
    public static mk(
        frontEndId: string,
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
        memo: string,
        skills: Skill[],
    ): Character {
        const c = new Character();
        return Object.assign(c, {
            frontEndId,
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
            memo,
            skills,
        });
    }

    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn({
        name: 'created_at',
    })
    @Index()
    createdAt: Date;

    @UpdateDateColumn({
        name: 'updated_at',
    })
    @Index()
    updatedAt: Date;

    @ManyToOne(
        type => BattleSession,
        battleSession => battleSession.characters,
    )
    battleSession: BattleSession;

    @Column({ default: '' })
    name: string;

    @Column({ default: '' })
    frontEndId: string;

    @Column({ default: 'None' })
    attribute: string;

    @Column({ default: 0, name: 'action_priority' })
    actionPriority: number;

    @Column({ default: 0, name: 'default_action_priority' })
    defaultActionPriority: number;

    @Column({ default: 0, name: 'hp' })
    hp: number;

    @Column({ default: 0, name: 'max_hp' })
    maxHp: number;

    @Column({ default: 0, name: 'physical_defence' })
    physicalDefence: number;

    @Column({ default: 0, name: 'default_physical_defence' })
    defaultPhysicalDefence: number;

    @Column({ default: 0, name: 'magical_defence' })
    magicalDefence: number;

    @Column({ default: 0, name: 'default_magical_defence' })
    defaultMagicalDefence: number;

    @Column({ default: 0, name: 'is_acted' })
    isActed: boolean;

    @Column({ default: '', name: 'memo' })
    memo: string;

    // 能力値と能力基本値
    @Column({ default: 0, name: 'strength' })
    strength: number;

    @Column({ default: 0, name: 'strength_base' })
    strength_base: number;

    @Column({ default: 0, name: 'dexterity' })
    dexterity: number;

    @Column({ default: 0, name: 'dexterity_base' })
    dexterity_base: number;

    @Column({ default: 0, name: 'agility' })
    agility: number;

    @Column({ default: 0, name: 'agility_base' })
    agility_base: number;

    @Column({ default: 0, name: 'wisdom' })
    wisdom: number;

    @Column({ default: 0, name: 'wisdom_base' })
    wisdom_base: number;

    @Column({ default: 0, name: 'sensitivity' })
    sensitivity: number;

    @Column({ default: 0, name: 'sensitivity_base' })
    sensitivity_base: number;

    @Column({ default: 0, name: 'power' })
    power: number;

    @Column({ default: 0, name: 'power_base' })
    power_base: number;

    @Column({ default: 0, name: 'luck' })
    luck: number;

    @Column({ default: 0, name: 'luck_base' })
    luck_base: number;

    @OneToOne(
        type => BadStatus,
        badStatus => badStatus.character,
        { cascade: true },
    )
    badStatus: BadStatus;

    @OneToMany(
        type => Skill,
        skill => skill.character,
        { cascade: true },
    )
    skills: Skill[];
}
