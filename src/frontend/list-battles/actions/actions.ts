import { loadBattleSessionsActions } from '../../list-battles/actions/load-battle-sessions';
import { createBattleSessionsActions } from './create-battle-session';
import actionCreatorFactory from 'typescript-fsa';

export type ActionTypes = 'LOAD_BATTLE_SESSIONS' | 'CREATE_BATTLE_SESSION' | 'UPDATE_CURRENT_SESSION_NAME';

const actionCreator = actionCreatorFactory();

export const actions = {
    ...loadBattleSessionsActions,
    ...createBattleSessionsActions,
    updateCurrentSessionName: actionCreator<React.ChangeEvent<HTMLInputElement>>('UPDATE_CURRENT_SESSION_NAME'),
};
