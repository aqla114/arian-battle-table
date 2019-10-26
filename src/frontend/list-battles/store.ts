import { createStore, combineReducers } from 'redux';
import { tableReducer } from './reducers/reducers';
import { BattlesListState } from './components/battles-list';

export type State = {
    battlesList: BattlesListState;
};

const store = createStore(
    combineReducers<State>({
        battlesList: tableReducer,
    }),
);

export default store;
