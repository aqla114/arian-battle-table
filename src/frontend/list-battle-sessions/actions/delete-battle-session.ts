import actionCreatorFactory, { ActionCreator, Failure, Success } from 'typescript-fsa';

const actionCreator = actionCreatorFactory();

const deleteBattleSession = actionCreator.async<{}, { sessionId: number }, {}>('DELETE_BATTLE_SESSION');

interface DeleteBattleSessionActions {
    startedDeleteBattleSession: ActionCreator<{}>;
    failedDeleteBattleSession: ActionCreator<Failure<{}, {}>>;
    doneDeleteBattleSession: ActionCreator<Success<{}, { sessionId: number }>>;
}

export const deleteBattleSessionsActions: DeleteBattleSessionActions = {
    startedDeleteBattleSession: deleteBattleSession.started,
    failedDeleteBattleSession: deleteBattleSession.failed,
    doneDeleteBattleSession: deleteBattleSession.done,
};
