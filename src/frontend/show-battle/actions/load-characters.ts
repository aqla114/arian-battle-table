import actionCreatorFactory, { ActionCreator, Failure, Success } from 'typescript-fsa';
import { CharacterTableState } from '../components/characters-table';

type Session = Pick<CharacterTableState, 'state'>;

const actionCreator = actionCreatorFactory();

const loadCharacters = actionCreator.async<{}, Session, {}>('LOAD_CHARACTERS');

interface LoadCharactersActions {
    startedLoadingCharacters: ActionCreator<{}>;
    failedLoadingCharacters: ActionCreator<Failure<{}, {}>>;
    doneLoadingCharacters: ActionCreator<Success<{}, Session>>;
}

export const loadCharactersActions: LoadCharactersActions = {
    startedLoadingCharacters: loadCharacters.started,
    failedLoadingCharacters: loadCharacters.failed,
    doneLoadingCharacters: loadCharacters.done,
};
