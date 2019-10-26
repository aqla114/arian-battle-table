import { connect } from 'react-redux';
import { Dispatch, Action } from 'redux';
import { actions } from './actions/actions';
import * as Request from 'superagent';
import { BattlesList, BattlesListState } from '../list-battles/components/battles-list';
import { State } from './store';

export interface Actions {
    loadBattleSessions: () => void;
}

function mapStateToProps(state: State): BattlesListState {
    return Object.assign({}, state.battlesList);
}

function mapDispatchToProps(dispatch: Dispatch<Action<string>>): Actions {
    return {
        loadBattleSessions: loadBattleSessionsMapper(dispatch),
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
