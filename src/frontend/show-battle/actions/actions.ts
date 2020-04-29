import actionCreatorFactory from 'typescript-fsa';
import { loadCharactersActions } from './load-characters';
import { saveCharactersActions } from './save-characters';
import { saveCharactersNewlyActions } from './save-characters-newly';

type CharacterName = string;

export type ChangeActionProps = { e: React.ChangeEvent<HTMLInputElement>; name: CharacterName };
export type MouseActionProps = { e: React.MouseEvent<HTMLInputElement, MouseEvent>; name: CharacterName };

export type ActionTypes =
    | 'UPDATE_CHARACTER_ATTRIBUTE_TEXT'
    | 'UPDATE_CHARACTER_IS_KNOCKBACK'
    | 'DELETE_CHARACTER'
    | 'UPDATE_CURRENT_NEW_CHARACTER'
    | 'ADD_NEW_CHARACTER'
    | 'LOAD_CHARACTERS'
    | 'SAVE_CHARACTERS'
    | 'SAVE_CHARACTERS_NEWLY';

const actionCreator = actionCreatorFactory();

export const actions = {
    updateCharacterAttributeText: actionCreator<ChangeActionProps>('UPDATE_CHARACTER_ATTRIBUTE_TEXT'),
    updateCharacterCheckbox: actionCreator<ChangeActionProps>('UPDATE_CHARACTER_IS_KNOCKBACK'),
    deleteCharacter: actionCreator<MouseActionProps>('DELETE_CHARACTER'),
    updateCurrentNewCharacter: actionCreator<React.ChangeEvent<HTMLInputElement>>('UPDATE_CURRENT_NEW_CHARACTER'),
    addNewCharacter: actionCreator('ADD_NEW_CHARACTER'),
    ...loadCharactersActions,
    ...saveCharactersActions,
    ...saveCharactersNewlyActions,
};
