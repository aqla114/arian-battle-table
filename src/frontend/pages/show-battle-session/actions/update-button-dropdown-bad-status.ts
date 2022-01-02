import { ButtonDropdownValue } from '../../../components/atoms/button-dropdown';
import { CharacterId } from './actions';

export type ACTION_TYPE = 'UPDATE_BUTTON_DROPDOWN_BAD_STATUS';

export type UpdateButtonDropdownBadStatusProps = {
    key: string;
    value: ButtonDropdownValue;
    characterId: CharacterId;
};
