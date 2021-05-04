import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { updateObject } from '../../utils/reducer-commons';
import { actions } from '../actions/actions';
import { BattleSessionsListState } from '../components/battle-sessions-list';

const initialState: BattleSessionsListState = {
    state: {
        battleSessions: [],
    },
    current: {
        sessionName: '',
        deleteSessionId: -1,
    },
    dom: {
        modal: null,
    },
};

export const tableReducer = reducerWithInitialState(initialState)
    .case(actions.doneLoadingBattleSessions, (state, props) => {
        return updateObject(state, {
            state: updateObject(state.state, { battleSessions: props.result.battleSessions }),
        });
    })
    .case(actions.doneCreateBattleSession, (state, props) => {
        const battleSessions = [...state.state.battleSessions, props.result.session];

        return updateObject(state, {
            state: updateObject(state.state, { battleSessions }),
            current: updateObject(state.current, { sessionName: '' }),
        });
    })
    .case(actions.doneDeleteBattleSession, (state, props) => {
        const battleSessions = state.state.battleSessions.filter(b => b.id !== props.result.sessionId);

        return updateObject(state, {
            state: updateObject(state.state, { battleSessions }),
            dom: updateObject(state.dom, { modal: null }),
        });
    })
    .case(actions.updateCurrentSessionName, (state, props) => {
        return updateObject(state, {
            current: updateObject(state.current, { sessionName: props.target.value }),
        });
    })
    .case(actions.openDeletionModal, (state, props) => {
        return updateObject(state, {
            dom: updateObject(state.dom, { modal: { type: 'DeletionModal' } }),
            current: updateObject(state.current, { deleteSessionId: props.payload }),
        });
    })
    .case(actions.closeDeletionModal, (state, props) => {
        return updateObject(state, {
            dom: updateObject(state.dom, { modal: null }),
            current: updateObject(state.current, { deleteSessionId: -1 }),
        });
    })
    .default(state => {
        console.log('The default reducer is used.');
        return state;
    });
