import actionCreatorFactory, { ActionCreator, Failure, Success } from 'typescript-fsa';

const actionCreator = actionCreatorFactory();

const saveCharacters = actionCreator.async<{}, {}, {}>('SAVE_CHARACTERS');

export type DoneSaveCharactersSuccess = Success<{}, {}>;

interface SaveCharactersActions {
    startedSaving: ActionCreator<{}>;
    failedSaving: ActionCreator<Failure<{}, {}>>;
    doneSaving: ActionCreator<DoneSaveCharactersSuccess>;
}

export const saveCharactersActions: SaveCharactersActions = {
    startedSaving: saveCharacters.started,
    failedSaving: saveCharacters.failed,
    doneSaving: saveCharacters.done,
};
