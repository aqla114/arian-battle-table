import { loadBattleSessionsActions } from '../../list-battles/actions/load-battle-sessions';

export type ActionTypes = 'LOAD_BATTLE_SESSIONS';

export const actions = {
    ...loadBattleSessionsActions,
};
