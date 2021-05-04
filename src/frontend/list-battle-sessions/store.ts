import { createStore, combineReducers } from 'redux';
import { tableReducer } from './reducers/reducers';
import { BattleSessionssListState } from './components/battle-sessions-list';

export type State = {
    battlesList: BattleSessionssListState;
};

const store = createStore(
    combineReducers<State>({
        battlesList: tableReducer,
    }),
);

export default store;
