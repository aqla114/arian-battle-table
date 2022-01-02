import { State as ShowBattleState } from './pages/show-battle-session/state';
import { State as ListBattleSessionsState } from './pages/list-battle-sessions/state';
import { combineReducers, createStore, Dispatch } from 'redux';
import { showBattleReducer } from './pages/show-battle-session/reducers/reducers';
import { listBattleSessionsReducer } from './pages/list-battle-sessions/reducers/reducers';

export type State = {
    showBattle: ShowBattleState;
    listBattleSessions: ListBattleSessionsState;
};

export const store = createStore(
    combineReducers({
        showBattle: showBattleReducer,
        listBattleSessions: listBattleSessionsReducer,
    }),
);

declare module 'react-redux' {
    interface DefaultRootState extends State {}
    export function useDispatch<TDispatch = Dispatch<any>>(): TDispatch;
}
