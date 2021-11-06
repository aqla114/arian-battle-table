import actionCreatorFactory, { ActionCreator, Failure, Success } from 'typescript-fsa';
import { State } from '../state';

type LoadCharactersResult = Pick<State, 'state'>;

const actionCreator = actionCreatorFactory();

const loadCharacters = actionCreator.async<{}, LoadCharactersResult, {}>('LOAD_CHARACTERS');

export type DoneLoadingCharactersSuccess = Success<{}, LoadCharactersResult>;
export interface LoadCharactersActions {
    startedLoadingCharacters: ActionCreator<{}>;
    failedLoadingCharacters: ActionCreator<Failure<{}, {}>>;
    doneLoadingCharacters: ActionCreator<Success<{}, LoadCharactersResult>>;
}

export const loadCharactersActions: LoadCharactersActions = {
    startedLoadingCharacters: loadCharacters.started,
    failedLoadingCharacters: loadCharacters.failed,
    doneLoadingCharacters: loadCharacters.done,
};
