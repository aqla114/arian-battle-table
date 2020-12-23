import actionCreatorFactory, { ActionCreator, Failure, Success } from 'typescript-fsa';
import { Character } from '../../types/character';

type Session = { characters: Character[] };

const actionCreator = actionCreatorFactory();

const importCharactersByGuildId = actionCreator.async<{}, Session, {}>('IMPORT_CHARACTERS_BY_GUILD_ID');

interface ImportCharactersByGuildIdActions {
    startedImportCharactersByGuildId: ActionCreator<{}>;
    failedImportCharactersByGuildId: ActionCreator<Failure<{}, {}>>;
    doneImportCharactersByGuildId: ActionCreator<Success<{}, Session>>;
}

export const importCharactersByGuildIdActions: ImportCharactersByGuildIdActions = {
    startedImportCharactersByGuildId: importCharactersByGuildId.started,
    failedImportCharactersByGuildId: importCharactersByGuildId.failed,
    doneImportCharactersByGuildId: importCharactersByGuildId.done,
};
