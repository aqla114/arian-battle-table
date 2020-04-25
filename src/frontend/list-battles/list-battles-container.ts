import { connect } from 'react-redux';
import { Dispatch, Action } from 'redux';
import { actions } from './actions/actions';
import * as Request from 'superagent';
import { BattlesList, BattlesListState } from '../list-battles/components/battles-list';
import { State } from './store';

export interface Actions {
    loadBattleSessions: () => void;
    createBattleSession: (sessionName: string) => void;
    updateCurrentSessionName: (v: React.ChangeEvent<HTMLInputElement>) => Action<string>;
}

function mapStateToProps(state: State): BattlesListState {
    return Object.assign({}, state.battlesList);
}

function mapDispatchToProps(dispatch: Dispatch<Action<string>>): Actions {
    return {
        loadBattleSessions: loadBattleSessionsMapper(dispatch),
        createBattleSession: createBattleSessionMapper(dispatch),
        updateCurrentSessionName: (e: React.ChangeEvent<HTMLInputElement>) =>
            dispatch(actions.updateCurrentSessionName(e)),
    };
}

function createBattleSessionMapper(dispatch: Dispatch<Action<string>>) {
    return (sessionName: string) => {
        dispatch(actions.startedCreateBattleSession({}));

        Request.post(`/api/create`)
            .send({ sessionName, characters: [] })
            .end((err, res) => {
                if (err) {
                    console.log(err);
                    dispatch(actions.failedCreateBattleSession({ params: {}, error: {} }));
                } else {
                    console.log(res.body);

                    dispatch(
                        actions.doneCreateBattleSession({
                            params: {},
                            result: {},
                        }),
                    );
                }
            });
    };
}

function loadBattleSessionsMapper(dispatch: Dispatch<Action<string>>) {
    return () => {
        dispatch(actions.startedLoadingBattleSessions({}));

        Request.get(`/api/list`).end((err, res) => {
            if (err) {
                console.log(err);
                dispatch(actions.failedLoadingBattleSessions({ params: {}, error: {} }));
            } else {
                console.log(res.body);

                dispatch(
                    actions.doneLoadingBattleSessions({
                        params: {},
                        result: {
                            battleSessions: res.body,
                        },
                    }),
                );
            }
        });
    };
}

export const BattlesListContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(BattlesList);
