import { UpdateSessionNameTextProps } from '../actions/update-session-name';
import { CharacterTableState } from '../components/characters-table';

export const updateSessionName: (
    state: CharacterTableState,
    props: UpdateSessionNameTextProps,
) => CharacterTableState = (state: CharacterTableState, props: UpdateSessionNameTextProps) => {
    const { e } = props;
    return { ...state, state: { ...state.state, sessionName: e.target.value } };
};
