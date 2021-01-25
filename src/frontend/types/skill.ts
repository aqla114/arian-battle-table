import * as uuid from 'uuid';

import { Skill } from '../../types/skill';

export type SkillId = string;

export type FrontendSkill = Skill & {
    frontendId: SkillId;
};

export function FrontendSkill() {
    return { ...Skill(), frontendId: uuid.v4() };
}
