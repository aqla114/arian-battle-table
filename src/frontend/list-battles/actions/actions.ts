import { loadBattleSessionsActions } from '../../list-battles/actions/load-battle-sessions';
import { createBattleSessionsActions } from './create-battle-session';

export type ActionTypes = 'LOAD_BATTLE_SESSIONS' | 'CREATE_BATTLE_SESSION';

export const actions = {
    ...loadBattleSessionsActions,
    ...createBattleSessionsActions,
};
