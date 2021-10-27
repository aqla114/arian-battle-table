import { Reducer } from 'react';
import { updateObject } from '../../utils/reducer-commons';
import { ImportCharactersByGuildIdSuccess } from '../actions/import-characters-by-guild-id';
import { UpdateCurrentGuildIdProps } from '../actions/update-current-guild-id';
import { State } from '../state';

export const updateCurrentGuildId: Reducer<State, UpdateCurrentGuildIdProps> = (
    state: State,
    props: UpdateCurrentGuildIdProps,
) => {
    return { ...state, current: updateObject(state.current, { currentGuildId: props.e.target.value }) };
};

export const doneImportCharactersByGuildId: (state: State, props: ImportCharactersByGuildIdSuccess) => State = (
    state,
    props,
) => {
    return {
        ...state,
        state: updateObject(state.state, { characters: props.result.characters }),
        current: updateObject(state.current, { currentGuildId: '' }),
    };
};
