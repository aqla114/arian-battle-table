import { MouseActionProps } from '../../types/actions';
import { SkillId } from '../../types/skill';
import { CharacterId } from './actions';

export type ACTION_TYPE = 'DELETE_SKILL';

// TODO : skillIdx を FrontendId にしようぜ。
export type DeleteSkillProps = MouseActionProps<{ characterId: CharacterId; skillId: SkillId }>;
