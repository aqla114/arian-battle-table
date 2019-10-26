import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { actions } from '../actions/actions';
import { BattlesListState } from '../components/battles-list';

const initialState: BattlesListState = {
    battlesList: [],
};

export const tableReducer = reducerWithInitialState(initialState)
    .case(actions.doneLoadingBattleSessions, (state, props) => {
        return { ...state, battlesList: props.result.battleSessions };
    })
    .default(state => {
        console.log('The default reducer is used.');
        return state;
    });
