import { connect } from 'react-redux';
import { Dispatch, Action } from 'redux';
import { actions } from './actions/actions';
import * as Request from 'superagent';
import { BattleSessionsList, BattleSessionsListState } from './components/battle-sessions-list';
import { State } from './reducers/reducers';
import { OpenDeletionModalProps } from './actions/open-deletion-modal';
import { routeFunctions, routes } from '../../types/routes';

export interface Actions {
    loadBattleSessions: () => void;
    createBattleSession: (sessionName: string) => void;
    deleteBattleSession: (sessionId: number) => void;
    updateCurrentSessionName: (v: React.ChangeEvent<HTMLInputElement>) => Action<string>;
    openDeletionModal: (v: OpenDeletionModalProps) => Action<string>;
    closeDeletionModal: () => Action<string>;
}

function mapStateToProps(state: State): BattleSessionsListState {
    return Object.assign({}, state.battleSessionsList);
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

        Request.post(routes.api.createBattleSession)
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

        Request.post(routeFunctions.api.deleteBattleSession(sessionId.toString()))
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

        Request.get(routes.api.listBattleSessions).end((err, res) => {
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

export const BattleSessionsListContainer = connect(mapStateToProps, mapDispatchToProps)(BattleSessionsList);
