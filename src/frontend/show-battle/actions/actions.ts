import actionCreatorFactory from 'typescript-fsa';
import { loadCharactersActions } from './load-characters';
import { saveCharactersActions } from './save-characters';
import { saveCharactersNewlyActions } from './save-characters-newly';
import { loadSkillsCsvActions } from './load-skills-csv';
import { importCharactersByGuildIdActions } from './import-characters-by-guild-id';
import { UpdateSessionNameTextProps, ACTION_TYPE as UPDATE_SESSION_NAME_TEXT } from './update-session-name';
import {
    UpdateCharacterAttributeNumberProps,
    ACTION_TYPE as UPDATE_CHARACTER_ATTRIBUTE_NUMBER,
} from './update-character-attribute-number-text';
import {
    UpdateCharacterAttributeTextProps,
    ACTION_TYPE as UPDATE_CHARACTER_ATTRIBUTE_TEXT,
} from './update-character-attribute-text';
import { UpdateCharacterCheckboxProps, ACTION_TYPE as UPDATE_CHARACTER_CHECKBOX } from './update-character-checkbox';
import {
    UpdateButtonDropdownBadStatusProps,
    ACTION_TYPE as UPDATE_BUTTON_DROPDOWN_BAD_STATUS,
} from './update-button-dropdown-bad-status';
import {
    UpdateCharacterAttributeDropdownProps,
    ACTION_TYPE as UPDATE_CHARACTER_ATTRIBUTE_DROPDOWN,
} from './update-character-attribute-dropdown';
import {
    UpdateSkillAttributeTextProps,
    ACTION_TYPE as UPDATE_SKILL_ATTRIBUTE_TEXT,
} from './update-skill-attribute-text';
import { DeleteSkillProps, ACTION_TYPE as DELETE_SKILL } from './delete-skill';
import { MoveSkillProps, ACTION_TYPE as MOVE_SKILL } from './move-skill';
import { OpenDeletionModalProps, ACTION_TYPE as OPEN_DELETION_MODAL } from './open-deletion-modal';
import { CopyCharacterProps, ACTION_TYPE as COPY_CHARACTER } from './copy-character';
import { OpenCharacterDetailsProps, ACTION_TYPE as OPEN_CHARACTER_DETAILS } from './open-character-details';
import { UpdateCurrentGuildIdProps, ACTION_TYPE as UPDATE_CURRENT_GUILD_ID } from './update-current-guild-id';

export type CharacterId = string;
export type GuildId = string;
export type CharacterName = string;

export type ActionTypes =
    | UPDATE_SESSION_NAME_TEXT
    | UPDATE_CHARACTER_ATTRIBUTE_NUMBER
    | UPDATE_CHARACTER_ATTRIBUTE_TEXT
    | UPDATE_CHARACTER_CHECKBOX
    | UPDATE_BUTTON_DROPDOWN_BAD_STATUS
    | UPDATE_CHARACTER_ATTRIBUTE_DROPDOWN
    | UPDATE_SKILL_ATTRIBUTE_TEXT
    | DELETE_SKILL
    | MOVE_SKILL
    | 'DELETE_CHARACTER'
    | COPY_CHARACTER
    | 'ADD_NEW_CHARACTER'
    | 'ADD_NEW_SKILL'
    | 'LOAD_CHARACTERS'
    | UPDATE_CURRENT_GUILD_ID
    | 'IMPORT_CHARACTERS_BY_GUILD_ID'
    | 'SAVE_CHARACTERS'
    | 'SAVE_CHARACTERS_NEWLY'
    | OPEN_DELETION_MODAL
    | OPEN_CHARACTER_DETAILS
    | 'CLOSE_MODAL'
    | 'RESTORE_HISTORY';

const _actionCreator = actionCreatorFactory();

function actionCreator<T = void>(actionType: ActionTypes) {
    return _actionCreator<T>(actionType);
}

export const actions = {
    updateSessionName: actionCreator<UpdateSessionNameTextProps>('UPDATE_SESSION_NAME_TEXT'),
    updateCharacterAttributeNumber: actionCreator<UpdateCharacterAttributeNumberProps>(
        'UPDATE_CHARACTER_ATTRIBUTE_NUMBER',
    ),
    updateCharacterAttributeText: actionCreator<UpdateCharacterAttributeTextProps>('UPDATE_CHARACTER_ATTRIBUTE_TEXT'),
    // TODO?: 行動済み・未行動と boolean のバステの処理が同じになっているけど分けた方がいいかもしれん。
    updateCharacterCheckbox: actionCreator<UpdateCharacterCheckboxProps>('UPDATE_CHARACTER_CHECKBOX'),
    updateButtonDropdownBadStatus: actionCreator<UpdateButtonDropdownBadStatusProps>(
        'UPDATE_BUTTON_DROPDOWN_BAD_STATUS',
    ),
    updateCharacterAttributeDropdown: actionCreator<UpdateCharacterAttributeDropdownProps>(
        'UPDATE_CHARACTER_ATTRIBUTE_DROPDOWN',
    ),
    updateSkillAttributeText: actionCreator<UpdateSkillAttributeTextProps>('UPDATE_SKILL_ATTRIBUTE_TEXT'),
    deleteSkill: actionCreator<DeleteSkillProps>('DELETE_SKILL'),
    moveSkill: actionCreator<MoveSkillProps>('MOVE_SKILL'),
    deleteCharacter: actionCreator('DELETE_CHARACTER'),
    copyCharacter: actionCreator<CopyCharacterProps>('COPY_CHARACTER'),
    restoreHistory: actionCreator('RESTORE_HISTORY'),
    openDeletionModal: actionCreator<OpenDeletionModalProps>('OPEN_DELETION_MODAL'),
    openCharacterDetails: actionCreator<OpenCharacterDetailsProps>('OPEN_CHARACTER_DETAILS'),
    closeModal: actionCreator('CLOSE_MODAL'),
    addNewCharacter: actionCreator('ADD_NEW_CHARACTER'),
    addNewSkill: actionCreator('ADD_NEW_SKILL'),
    updateCurrentGuildId: actionCreator<UpdateCurrentGuildIdProps>('UPDATE_CURRENT_GUILD_ID'),
    ...loadCharactersActions,
    ...saveCharactersActions,
    ...saveCharactersNewlyActions,
    ...loadSkillsCsvActions,
    ...importCharactersByGuildIdActions,
};
