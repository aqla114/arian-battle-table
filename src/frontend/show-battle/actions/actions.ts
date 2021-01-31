import actionCreatorFactory from 'typescript-fsa';
import { loadCharactersActions } from './load-characters';
import { saveCharactersActions } from './save-characters';
import { saveCharactersNewlyActions } from './save-characters-newly';
import { FrontendCharacter } from '../../types/character';
import { loadSkillsCsvActions } from './load-skills-csv';
import { importCharactersByGuildIdActions } from './import-characters-by-guild-id';
import { SkillId } from '../../types/skill';
import { ChangeActionProps, MouseActionProps } from '../../types/actions';
import { UpdateSessionNameTextProps, ACTION_TYPE as UPDATE_SESSION_NAME_TEXT } from './update-session-name';
import {
    UpdateCharacterAttributeNumberTextProps,
    ACTION_TYPE as UPDATE_CHARACTER_ATTRIBUTE_NUMBER_TEXT,
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

export type CharacterId = string;
export type GuildId = string;
export type CharacterName = string;

export type MoveSkillProps = { characterId: CharacterId; dragIdx: number; dropIdx: number };

export type ActionTypes =
    | UPDATE_SESSION_NAME_TEXT
    | UPDATE_CHARACTER_ATTRIBUTE_NUMBER_TEXT
    | UPDATE_CHARACTER_ATTRIBUTE_TEXT
    | UPDATE_CHARACTER_CHECKBOX
    | UPDATE_BUTTON_DROPDOWN_BAD_STATUS
    | 'UPDATE_CHARACTER_DROPDOWN'
    | 'DELETE_CHARACTER'
    | 'UPDATE_SKILL_ATTRIBUTE_TEXT'
    | 'DELETE_SKILL'
    | 'MOVE_SKILL'
    | 'COPY_CHARACTER'
    | 'OPEN_CHARACTER_DETAILS'
    | 'ADD_NEW_CHARACTER'
    | 'ADD_NEW_SKILL'
    | 'LOAD_CHARACTERS'
    | 'UPDATE_CURRENT_GUILD_ID'
    | 'IMPORT_CHARACTERS_BY_GUILD_ID'
    | 'SAVE_CHARACTERS'
    | 'SAVE_CHARACTERS_NEWLY'
    | 'OPEN_DELETION_MODAL'
    | 'CLOSE_MODAL'
    | 'RESTORE_HISTORY';

const _actionCreator = actionCreatorFactory();

function actionCreator<T = void>(actionType: ActionTypes) {
    return _actionCreator<T>(actionType);
}

export const actions = {
    // TODO : updateSessionName`Text`
    updateSessionName: actionCreator<UpdateSessionNameTextProps>('UPDATE_SESSION_NAME_TEXT'),
    // TODO: NumberText とかいうのわからんし、Number だけでよくね？
    updateCharacterAttributeNumberText: actionCreator<UpdateCharacterAttributeNumberTextProps>(
        'UPDATE_CHARACTER_ATTRIBUTE_NUMBER_TEXT',
    ),
    updateCharacterAttributeText: actionCreator<UpdateCharacterAttributeTextProps>('UPDATE_CHARACTER_ATTRIBUTE_TEXT'),
    // TODO?: 行動済み・未行動と boolean のバステの処理が同じになっているけど分けた方がいいかもしれん。
    updateCharacterCheckbox: actionCreator<UpdateCharacterCheckboxProps>('UPDATE_CHARACTER_CHECKBOX'),
    updateButtonDropdownBadStatus: actionCreator<UpdateButtonDropdownBadStatusProps>(
        'UPDATE_BUTTON_DROPDOWN_BAD_STATUS',
    ),
    updateCharacterAttributeDropdown: actionCreator<ChangeActionProps<CharacterId>>('UPDATE_CHARACTER_DROPDOWN'),
    openDeletionModal: actionCreator<MouseActionProps<CharacterId>>('OPEN_DELETION_MODAL'),
    closeModal: actionCreator('CLOSE_MODAL'),
    restoreHistory: actionCreator('RESTORE_HISTORY'),
    deleteCharacter: actionCreator('DELETE_CHARACTER'),
    updateSkillAttributeText: actionCreator<ChangeActionProps<{ characterId: CharacterId; skillIndex: number }>>(
        'UPDATE_SKILL_ATTRIBUTE_TEXT',
    ),
    deleteSkill: actionCreator<MouseActionProps<{ characterId: CharacterId; skillId: SkillId }>>('DELETE_SKILL'),
    moveSkill: actionCreator<MoveSkillProps>('MOVE_SKILL'),
    copyCharacter: actionCreator<{ character: FrontendCharacter }>('COPY_CHARACTER'),
    openCharacterDetails: actionCreator<MouseActionProps<CharacterId>>('OPEN_CHARACTER_DETAILS'),
    addNewCharacter: actionCreator('ADD_NEW_CHARACTER'),
    addNewSkill: actionCreator('ADD_NEW_SKILL'),
    updateCurrentGuildId: actionCreator<ChangeActionProps>('UPDATE_CURRENT_GUILD_ID'),
    ...loadCharactersActions,
    ...saveCharactersActions,
    ...saveCharactersNewlyActions,
    ...loadSkillsCsvActions,
    ...importCharactersByGuildIdActions,
};
