import { MouseActionProps } from '../../types/actions';

export type SessionId = number;

export type ACTION_TYPE = 'OPEN_DELETION_MODAL';

export type OpenDeletionModalProps = MouseActionProps<SessionId>;
