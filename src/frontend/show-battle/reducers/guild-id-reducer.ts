import { Reducer } from 'react';
import { ChangeActionProps } from '../../types/actions';
import { updateObject } from '../../utils/reducer-commons';
import { ImportCharactersByGuildIdSuccess } from '../actions/import-characters-by-guild-id';
import { CharacterTableState } from '../components/characters-table';

export const updateCurrentGuildId: Reducer<CharacterTableState, ChangeActionProps> = (
    state: CharacterTableState,
    props: ChangeActionProps,
) => {
    return { ...state, current: updateObject(state.current, { currentGuildId: props.e.target.value }) };
};

export const doneImportCharactersByGuildId: (
    state: CharacterTableState,
    props: ImportCharactersByGuildIdSuccess,
) => CharacterTableState = (state, props) => {
    return {
        ...state,
        state: updateObject(state.state, { characters: props.result.characters }),
        current: updateObject(state.current, { currentGuildId: '' }),
    };
};
