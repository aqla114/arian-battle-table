import actionCreatorFactory, { ActionCreator, Failure, Success } from 'typescript-fsa';
import { BattleSession } from '../state';

const actionCreator = actionCreatorFactory();

const createBattleSession = actionCreator.async<{}, { session: BattleSession }, {}>('CREATE_BATTLE_SESSION');

interface CreateBattleSessionActions {
    startedCreateBattleSession: ActionCreator<{}>;
    failedCreateBattleSession: ActionCreator<Failure<{}, {}>>;
    doneCreateBattleSession: ActionCreator<Success<{}, { session: BattleSession }>>;
}

export const createBattleSessionsActions: CreateBattleSessionActions = {
    startedCreateBattleSession: createBattleSession.started,
    failedCreateBattleSession: createBattleSession.failed,
    doneCreateBattleSession: createBattleSession.done,
};
