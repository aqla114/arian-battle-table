import { CharacterTableState } from '../components/characters-table';
import { ChangeSessionNameProps } from '../actions/actions';

export const updateSessionName: (state: CharacterTableState, props: ChangeSessionNameProps) => CharacterTableState = (
    state: CharacterTableState,
    props: ChangeSessionNameProps,
) => {
    const { e } = props;
    return { ...state, state: { ...state.state, sessionName: e.target.value } };
};
