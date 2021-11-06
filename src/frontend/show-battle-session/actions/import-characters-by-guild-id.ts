import actionCreatorFactory, { ActionCreator, Failure, Success } from 'typescript-fsa';
import { FrontendCharacter } from '../../types/character';

type ImportCharactersByGuildIdResult = { characters: FrontendCharacter[] };

const actionCreator = actionCreatorFactory();

const importCharactersByGuildId = actionCreator.async<{}, ImportCharactersByGuildIdResult, {}>(
    'IMPORT_CHARACTERS_BY_GUILD_ID',
);

export type ImportCharactersByGuildIdSuccess = Success<{}, ImportCharactersByGuildIdResult>;

interface ImportCharactersByGuildIdActions {
    startedImportCharactersByGuildId: ActionCreator<{}>;
    failedImportCharactersByGuildId: ActionCreator<Failure<{}, {}>>;
    doneImportCharactersByGuildId: ActionCreator<ImportCharactersByGuildIdSuccess>;
}

export const importCharactersByGuildIdActions: ImportCharactersByGuildIdActions = {
    startedImportCharactersByGuildId: importCharactersByGuildId.started,
    failedImportCharactersByGuildId: importCharactersByGuildId.failed,
    doneImportCharactersByGuildId: importCharactersByGuildId.done,
};
