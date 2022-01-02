import { ActionProps } from '../../../types/actions';

export type ACTION_TYPE = 'UPDATE_SESSION_NAME_TEXT';

export type UpdateSessionNameTextProps = ActionProps<React.ChangeEvent<HTMLInputElement>>;
