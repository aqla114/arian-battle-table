import actionCreatorFactory, { ActionCreator, Failure, Success } from 'typescript-fsa';

const actionCreator = actionCreatorFactory();

const createBattleSession = actionCreator.async<{}, {}, {}>('CREATE_BATTLE_SESSION');

interface CreateBattleSessionActions {
    startedCreateBattleSession: ActionCreator<{}>;
    failedCreateBattleSession: ActionCreator<Failure<{}, {}>>;
    doneCreateBattleSession: ActionCreator<Success<{}, {}>>;
}

export const createBattleSessionsActions: CreateBattleSessionActions = {
    startedCreateBattleSession: createBattleSession.started,
    failedCreateBattleSession: createBattleSession.failed,
    doneCreateBattleSession: createBattleSession.done,
};
