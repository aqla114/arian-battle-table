import { MouseActionProps } from '../../types/actions';

// FIXME
export type SessionId = number;

export type ACTION_TYPE = 'OPEN_DELETION_MODAL';

export type OpenDeletionModalProps = MouseActionProps<SessionId>;
