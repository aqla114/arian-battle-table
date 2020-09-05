import actionCreatorFactory from 'typescript-fsa';
import { loadCharactersActions } from './load-characters';
import { saveCharactersActions } from './save-characters';
import { saveCharactersNewlyActions } from './save-characters-newly';
import { CharacterProps } from '../components/characters-table';
import { ButtonDropdownValue } from '../../components/atoms/button-dropdown';

type CharacterName = string;

export type ChangeSessionNameProps = { e: React.ChangeEvent<HTMLInputElement> };
export type ChangeActionProps = { e: React.ChangeEvent<HTMLInputElement>; name: CharacterName };
export type MouseActionProps = {
    e: React.MouseEvent<HTMLInputElement | HTMLLIElement, MouseEvent>;
    name: CharacterName;
};
export type ClickDropDownListItemProps = {
    key: string;
    value: ButtonDropdownValue;
    name: CharacterName;
};

export type ActionTypes =
    | 'UPDATE_SESSION_NAME_TEXT'
    | 'UPDATE_CHARACTER_ATTRIBUTE_TEXT'
    | 'UPDATE_CHARACTER_IS_KNOCKBACK'
    | 'UPDATE_BUTTON_DROPDOWN_BAD_STATUS'
    | 'UPDATE_CHARACTER_DROPDOWN'
    | 'DELETE_CHARACTER'
    | 'COPY_CHARACTER'
    | 'UPDATE_CURRENT_NEW_CHARACTER'
    | 'ADD_NEW_CHARACTER'
    | 'LOAD_CHARACTERS'
    | 'SAVE_CHARACTERS'
    | 'SAVE_CHARACTERS_NEWLY'
    | 'OPEN_DELETION_MODAL'
    | 'CLOSE_DELETION_MODAL';

const actionCreator = actionCreatorFactory();

export const actions = {
    updateSessionName: actionCreator<ChangeSessionNameProps>('UPDATE_SESSION_NAME_TEXT'),
    updateCharacterAttributeText: actionCreator<ChangeActionProps>('UPDATE_CHARACTER_ATTRIBUTE_TEXT'),
    updateCharacterCheckbox: actionCreator<ChangeActionProps>('UPDATE_CHARACTER_IS_KNOCKBACK'),
    updateButtonDropdownBadStatus: actionCreator<ClickDropDownListItemProps>('UPDATE_BUTTON_DROPDOWN_BAD_STATUS'),
    updateCharacterDropdown: actionCreator<ChangeActionProps>('UPDATE_CHARACTER_DROPDOWN'),
    openDeletionModal: actionCreator<MouseActionProps>('OPEN_DELETION_MODAL'),
    closeDeletionModal: actionCreator('CLOSE_DELETION_MODAL'),
    deleteCharacter: actionCreator('DELETE_CHARACTER'),
    copyCharacter: actionCreator<{ character: CharacterProps }>('COPY_CHARACTER'),
    updateCurrentNewCharacter: actionCreator<React.ChangeEvent<HTMLInputElement>>('UPDATE_CURRENT_NEW_CHARACTER'),
    addNewCharacter: actionCreator('ADD_NEW_CHARACTER'),
    ...loadCharactersActions,
    ...saveCharactersActions,
    ...saveCharactersNewlyActions,
};
