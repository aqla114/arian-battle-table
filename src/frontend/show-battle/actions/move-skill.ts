import { CharacterId } from './actions';

export type ACTION_TYPE = 'MOVE_SKILL';

export type MoveSkillProps = { characterId: CharacterId; dragIdx: number; dropIdx: number };
