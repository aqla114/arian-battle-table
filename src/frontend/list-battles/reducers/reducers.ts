import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { actions } from '../actions/actions';
import { BattlesListState } from '../components/battle-sessions-list';

const initialState: BattlesListState = {
    sessionName: '',
    battlesList: [],
};

export const tableReducer = reducerWithInitialState(initialState)
    .case(actions.doneLoadingBattleSessions, (state, props) => {
        return { ...state, battlesList: props.result.battleSessions };
    })
    .case(actions.doneCreateBattleSession, (state, props) => {
        const battlesList = [...state.battlesList, props.result.session];

        return { ...state, battlesList, sessionName: '' };
    })
    .case(actions.doneDeleteBattleSession, (state, props) => {
        const battlesList = state.battlesList.filter(b => b.id !== props.result.sessionId);

        return { ...state, battlesList };
    })
    .case(actions.updateCurrentSessionName, (state, props) => {
        return { ...state, sessionName: props.target.value };
    })
    .default(state => {
        console.log('The default reducer is used.');
        return state;
    });
