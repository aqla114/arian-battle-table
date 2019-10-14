import actionCreatorFactory, { ActionCreator, Failure, Success } from 'typescript-fsa';

const actionCreator = actionCreatorFactory();

const saveCharacters = actionCreator.async<{}, {}, {}>('SAVE_CHARACTERS');

interface SaveCharactersActions {
    startedSaving: ActionCreator<{}>;
    failedSaving: ActionCreator<Failure<{}, {}>>;
    doneSaving: ActionCreator<Success<{}, {}>>;
}

export const saveCharactersActions: SaveCharactersActions = {
    startedSaving: saveCharacters.started,
    failedSaving: saveCharacters.failed,
    doneSaving: saveCharacters.done,
};
