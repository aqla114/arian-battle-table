import actionCreatorFactory from 'typescript-fsa';

import { loadBattleSessionsActions } from './load-battle-sessions';
import { createBattleSessionsActions } from './create-battle-session';
import { deleteBattleSessionsActions } from './delete-battle-session';
import { OpenDeletionModalProps, ACTION_TYPE as OPEN_DELETION_MODAL_ACTION_TYPE } from './open-deletion-modal';
import { ChangeEvent } from 'react';

export type ActionTypes =
    | 'LOAD_BATTLE_SESSIONS'
    | 'CREATE_BATTLE_SESSION'
    | 'UPDATE_CURRENT_SESSION_NAME'
    | OPEN_DELETION_MODAL_ACTION_TYPE
    | 'CLOSE_DELETION_MODAL';

const actionCreator = actionCreatorFactory();

export const actions = {
    ...loadBattleSessionsActions,
    ...createBattleSessionsActions,
    ...deleteBattleSessionsActions,
    updateCurrentSessionName: actionCreator<ChangeEvent<HTMLInputElement>>('UPDATE_CURRENT_SESSION_NAME'),
    openDeletionModal: actionCreator<OpenDeletionModalProps>('OPEN_DELETION_MODAL_ACTION_TYPE'),
    closeDeletionModal: actionCreator('CLOSE_DELETION_MODAL'),
};
