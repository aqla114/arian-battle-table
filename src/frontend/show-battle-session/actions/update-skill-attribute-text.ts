import { ChangeActionProps } from '../../types/actions';
import { CharacterId } from './actions';

export type ACTION_TYPE = 'UPDATE_SKILL_ATTRIBUTE_TEXT';

// TODO : skillIdx を FrontendId にしようぜ。
export type UpdateSkillAttributeTextProps = ChangeActionProps<{ characterId: CharacterId; skillIndex: number }>;
