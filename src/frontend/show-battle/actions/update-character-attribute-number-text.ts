import { ChangeActionProps } from '../../types/actions';
import { CharacterId } from './actions';

export type ACTION_TYPE = 'UPDATE_CHARACTER_ATTRIBUTE_NUMBER_TEXT';

export type UpdateCharacterAttributeNumberTextProps = ChangeActionProps<CharacterId>;
