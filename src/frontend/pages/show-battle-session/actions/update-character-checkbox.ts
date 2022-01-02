import { ChangeActionProps } from '../../../types/actions';
import { CharacterId } from './actions';

export type ACTION_TYPE = 'UPDATE_CHARACTER_CHECKBOX';

export type UpdateCharacterCheckboxProps = ChangeActionProps<CharacterId>;
