import actionCreatorFactory, { ActionCreator, Failure, Success } from 'typescript-fsa';
import { CharacterProps } from '../characters-table';

const actionCreator = actionCreatorFactory();

const loadCharacters = actionCreator.async<{}, { characters: CharacterProps[] }, {}>('LOAD_CHARACTERS');

interface LoadCharactersActions {
    startedLoading: ActionCreator<{}>;
    failedLoading: ActionCreator<Failure<{}, {}>>;
    doneLoading: ActionCreator<Success<{}, { characters: CharacterProps[] }>>;
}

export const loadCharactersActions: LoadCharactersActions = {
    startedLoading: loadCharacters.started,
    failedLoading: loadCharacters.failed,
    doneLoading: loadCharacters.done,
};
