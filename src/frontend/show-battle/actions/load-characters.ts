import actionCreatorFactory, { ActionCreator, Failure, Success } from 'typescript-fsa';
import { CharacterProps } from '../components/characters-table';

type Session = {
    sessionName: string;
    characters: CharacterProps[];
};

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
