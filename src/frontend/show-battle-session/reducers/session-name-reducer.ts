import { UpdateSessionNameTextProps } from '../actions/update-session-name';
import { State } from '../state';

export const updateSessionName: (state: State, props: UpdateSessionNameTextProps) => State = (
    state: State,
    props: UpdateSessionNameTextProps,
) => {
    const { e } = props;
    return { ...state, state: { ...state.state, sessionName: e.target.value } };
};
