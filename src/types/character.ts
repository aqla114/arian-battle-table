import { Attribute } from './attribute';
import { BadStatus, defaultBadStatus } from './bad-status';
import { Skill } from './skill';

export type Character = {
    id?: string;
    name: string;
    attribute: Attribute;
    defaultActionPriority: number;
    actionPriority: number;
    defaultMobility: number;
    mobility: number;
    hp: number;
    maxHp: number;
    physicalDefence: number;
    defaultPhysicalDefence: number;
    magicalDefence: number;
    defaultMagicalDefence: number;
    strength: number;
    strength_base: number;
    dexterity: number;
    dexterity_base: number;
    agility: number;
    agility_base: number;
    wisdom: number;
    wisdom_base: number;
    sensitivity: number;
    sensitivity_base: number;
    power: number;
    power_base: number;
    luck: number;
    luck_base: number;
    isActed: boolean;
    memo: string;
    badStatus: BadStatus;
    skills: Skill[];
};

export function Character(character: Partial<Character>): Omit<Character, 'id'> {
    return {
        name: '',
        attribute: 'None',
        actionPriority: 0,
        defaultActionPriority: 0,
        mobility: 0,
        defaultMobility: 0,
        hp: 0,
        maxHp: 0,
        physicalDefence: 0,
        defaultPhysicalDefence: 0,
        magicalDefence: 0,
        defaultMagicalDefence: 0,
        strength: 0,
        strength_base: 0,
        dexterity: 0,
        dexterity_base: 0,
        agility: 0,
        agility_base: 0,
        wisdom: 0,
        wisdom_base: 0,
        sensitivity: 0,
        sensitivity_base: 0,
        power: 0,
        power_base: 0,
        luck: 0,
        luck_base: 0,
        memo: '',
        skills: [],
        badStatus: defaultBadStatus,
        isActed: false,
        ...character,
    };
}
