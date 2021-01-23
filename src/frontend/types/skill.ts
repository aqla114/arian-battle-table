import * as uuid from 'uuid';

import { Skill } from '../../types/skill';

export type FrontendSkill = Skill & {
    frontendId: string;
};

export function FrontendSkill() {
    return { ...Skill(), frontendId: uuid.v4() };
}
