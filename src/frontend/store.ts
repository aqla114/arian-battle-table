import { createStore, combineReducers } from 'redux';
import { tableReducer } from './reducers/reducers';
import { CharacterTableState } from './characters-table';

export type State = {
    charactersTabel: CharacterTableState;
};

const store = createStore(
    combineReducers<State>({
        charactersTabel: tableReducer,
    }),
);

export default store;
