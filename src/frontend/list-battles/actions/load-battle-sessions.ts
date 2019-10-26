import actionCreatorFactory, { ActionCreator, Failure, Success } from 'typescript-fsa';

const actionCreator = actionCreatorFactory();

const loadBattleSessions = actionCreator.async<{}, { battleSessions: any[] }, {}>('LOAD_BATTLE_SESSIONS');

interface LoadBattleSessionsActions {
    startedLoadingBattleSessions: ActionCreator<{}>;
    failedLoadingBattleSessions: ActionCreator<Failure<{}, {}>>;
    doneLoadingBattleSessions: ActionCreator<Success<{}, { battleSessions: any[] }>>;
}

export const loadBattleSessionsActions: LoadBattleSessionsActions = {
    startedLoadingBattleSessions: loadBattleSessions.started,
    failedLoadingBattleSessions: loadBattleSessions.failed,
    doneLoadingBattleSessions: loadBattleSessions.done,
};
