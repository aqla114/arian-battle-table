import { MouseActionProps } from '../../../types/actions';
import { CharacterId } from './actions';

export type ACTION_TYPE = 'OPEN_CHARACTER_DETAILS';

// TODO : 実は、character の frontendId を渡すべきでは？
export type OpenCharacterDetailsProps = MouseActionProps<CharacterId>;
