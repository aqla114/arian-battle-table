import actionCreatorFactory, { ActionCreator, Failure, Success } from 'typescript-fsa';

const actionCreator = actionCreatorFactory();

const saveCharactersNewly = actionCreator.async<{}, {}, {}>('SAVE_CHARACTERS_NEWLY');

interface SaveCharactersNewlyActions {
    startedSavingNewly: ActionCreator<{}>;
    failedSavingNewly: ActionCreator<Failure<{}, {}>>;
    doneSavingNewly: ActionCreator<Success<{}, {}>>;
}

export const saveCharactersNewlyActions: SaveCharactersNewlyActions = {
    startedSavingNewly: saveCharactersNewly.started,
    failedSavingNewly: saveCharactersNewly.failed,
    doneSavingNewly: saveCharactersNewly.done,
};
