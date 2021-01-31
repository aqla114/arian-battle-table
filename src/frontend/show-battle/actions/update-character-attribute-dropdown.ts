import { ChangeActionProps } from '../../types/actions';
import { CharacterId } from './actions';

export type ACTION_TYPE = 'UPDATE_CHARACTER_ATTRIBUTE_DROPDOWN';

export type UpdateCharacterAttributeDropdownProps = ChangeActionProps<CharacterId>;
