import { createStore, combineReducers } from 'redux';
import { tableReducer } from './reducers/reducers';
import { BattleSessionsListState } from './components/battle-sessions-list';

export type State = {
    battleSessionsList: BattleSessionsListState;
};

const store = createStore(
    combineReducers<State>({
        battleSessionsList: tableReducer,
    }),
);

export default store;
