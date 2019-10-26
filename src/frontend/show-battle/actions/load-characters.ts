import actionCreatorFactory, { ActionCreator, Failure, Success } from 'typescript-fsa';
import { CharacterProps } from '../components/characters-table';

const actionCreator = actionCreatorFactory();

const loadCharacters = actionCreator.async<{}, { characters: CharacterProps[] }, {}>('LOAD_CHARACTERS');

interface LoadCharactersActions {
    startedLoadingCharacters: ActionCreator<{}>;
    failedLoadingCharacters: ActionCreator<Failure<{}, {}>>;
    doneLoadingCharacters: ActionCreator<Success<{}, { characters: CharacterProps[] }>>;
}

export const loadCharactersActions: LoadCharactersActions = {
    startedLoadingCharacters: loadCharacters.started,
    failedLoadingCharacters: loadCharacters.failed,
    doneLoadingCharacters: loadCharacters.done,
};
