import { MouseActionProps } from '../../../types/actions';
import { CharacterId } from './actions';

export type ACTION_TYPE = 'OPEN_DELETION_MODAL';

export type OpenDeletionModalProps = MouseActionProps<CharacterId>;
