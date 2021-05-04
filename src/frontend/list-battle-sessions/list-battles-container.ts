import { connect } from 'react-redux';
import { Dispatch, Action } from 'redux';
import { actions } from './actions/actions';
import * as Request from 'superagent';
import { BattleSessionsList, BattlesListState } from './components/battle-sessions-list';
import { State } from './store';
import { OpenDeletionModalProps } from './actions/open-deletion-modal';

export interface Actions {
    loadBattleSessions: () => void;
    createBattleSession: (sessionName: string) => void;
    deleteBattleSession: (sessionId: number) => void;
    updateCurrentSessionName: (v: React.ChangeEvent<HTMLInputElement>) => Action<string>;
    openDeletionModal: (v: OpenDeletionModalProps) => Action<string>;
    closeDeletionModal: () => Action<string>;
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
        deleteBattleSession: deleteBattleSessionMapper(dispatch),
        openDeletionModal: (v: OpenDeletionModalProps) => dispatch(actions.openDeletionModal(v)),
        closeDeletionModal: () => dispatch(actions.closeDeletionModal()),
    };
}

function createBattleSessionMapper(dispatch: Dispatch<Action<string>>) {
    return (sessionName: string) => {
        dispatch(actions.startedCreateBattleSession({}));

        if (sessionName === '') {
            window.alert('無名のセッションを作ることはできません');
            dispatch(actions.failedCreateBattleSession({ params: {}, error: {} }));
            return;
        }

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
                            result: { session: res.body },
                        }),
                    );
                }
            });
    };
}

function deleteBattleSessionMapper(dispatch: Dispatch<Action<string>>) {
    return (sessionId: number) => {
        dispatch(actions.startedDeleteBattleSession({}));

        Request.post(`/api/${sessionId}/delete`)
            .send()
            .end((err, res) => {
                if (err) {
                    console.log(err);
                    dispatch(actions.failedDeleteBattleSession({ params: {}, error: {} }));
                } else {
                    console.log(res);
                    dispatch(
                        actions.doneDeleteBattleSession({
                            params: {},
                            result: { sessionId },
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

export const BattlesListContainer = connect(mapStateToProps, mapDispatchToProps)(BattleSessionsList);
