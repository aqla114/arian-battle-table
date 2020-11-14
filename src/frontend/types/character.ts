import { Attribute } from './attribute';
import { BadStatus, defaultBadStatus } from './bad-status';
import { Skill } from './skill';
import { CharacterName, CharacterID } from '../show-battle/actions/actions';

export type Character = {
    id: CharacterID,
    name: CharacterName;
    attribute: Attribute;
    defaultActionPriority: number;
    actionPriority: number;
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
    serverId: number | null,
};

export function Character(
    id: CharacterID = '',
    name: CharacterName = '',
    attribute: Attribute = 'None',
    actionPriority: number = 0,
    defaultActionPriority: number = 0,
    hp: number = 0,
    maxHp: number = 0,
    physicalDefence: number = 0,
    defaultPhysicalDefence: number = 0,
    magicalDefence: number = 0,
    defaultMagicalDefence: number = 0,
    strength: number = 0,
    strength_base: number = 0,
    dexterity: number = 0,
    dexterity_base: number = 0,
    agility: number = 0,
    agility_base: number = 0,
    wisdom: number = 0,
    wisdom_base: number = 0,
    sensitivity: number = 0,
    sensitivity_base: number = 0,
    power: number = 0,
    power_base: number = 0,
    luck: number = 0,
    luck_base: number = 0,
    isActed: boolean = false,
    memo: string = '',
    badStatus: BadStatus = defaultBadStatus,
    skills: Skill[] = [],
    serverId: number | null = null,
): Character {
    return {
        id,
        name,
        attribute,
        defaultActionPriority,
        actionPriority,
        hp,
        maxHp,
        physicalDefence,
        defaultPhysicalDefence,
        magicalDefence,
        defaultMagicalDefence,
        badStatus,
        isActed,
        memo,
        skills,
        strength,
        strength_base,
        dexterity,
        dexterity_base,
        agility,
        agility_base,
        wisdom,
        wisdom_base,
        sensitivity,
        sensitivity_base,
        power,
        power_base,
        luck,
        luck_base,
        serverId,
    };
}
