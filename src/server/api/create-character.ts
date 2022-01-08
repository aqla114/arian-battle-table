import { Context } from '../types';
import { Repository } from 'typeorm';
import { BattleSession } from '../models/battle-session';
import { Character } from '../models/character';
import { Skill } from '../models/skill';
import { BadStatus } from '../models/bad-status';

type RequestBody = {
    characterId?: number;
};

export async function createCharacter(ctx: Context, sessionId: string) {
    const battleSessionRepo: Repository<BattleSession> = ctx.ports.battleSession;
    const characterRepo: Repository<Character> = ctx.ports.character;

    const req: RequestBody = ctx.request.body;

    const battleSession = await battleSessionRepo.findOne({
        where: { id: sessionId },
        relations: ['characters', 'characters.badStatus', 'characters.skills'],
    });

    if (!battleSession) {
        console.error('The battle session is not found.');
        return;
    }

    if (!req.characterId) {
        console.error('The character is not found.');
        return;
    }

    const character = battleSession.characters.find(x => x.id === req.characterId) || Character.mk({});

    const skills = character.skills.map(skill => {
        const { id, ...others } = skill;
        return Skill.mk(
            others.name,
            others.timing,
            others.determinationWay,
            others.target,
            others.range,
            others.restriction,
            others.detail,
        );
    });

    const { id, ...others } = character;

    const createdCharacter = await characterRepo.save({ ...others, skills, badStatus: BadStatus.mk() });

    battleSession.characters = [...battleSession.characters, createdCharacter];

    await battleSessionRepo.save(battleSession);

    return createdCharacter;
}
