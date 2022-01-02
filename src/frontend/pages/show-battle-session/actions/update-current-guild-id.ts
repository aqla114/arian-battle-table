import { ChangeActionProps } from '../../../types/actions';

export type ACTION_TYPE = 'UPDATE_CURRENT_GUILD_ID';

// TODO : 実は、character の frontendId を渡すべきでは？
export type UpdateCurrentGuildIdProps = ChangeActionProps;
