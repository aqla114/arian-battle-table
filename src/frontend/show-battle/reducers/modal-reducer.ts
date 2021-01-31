import { Reducer } from 'react';
import { MouseActionProps } from '../../types/actions';
import { updateObject } from '../../utils/reducer-commons';
import { OpenCharacterDetailsProps } from '../actions/open-character-details';
import { OpenDeletionModalProps } from '../actions/open-deletion-modal';
import { CharacterTableState } from '../components/characters-table';

export const openDeletionModal: Reducer<CharacterTableState, MouseActionProps<string>> = (
    state: CharacterTableState,
    props: OpenDeletionModalProps,
) => {
    return {
        ...state,
        current: updateObject(state.current, { deleteCharacterID: props.payload }),
        dom: updateObject(state.dom, { modal: { type: 'DeletionModal' } }),
    };
};

export const openCharacterDetails: Reducer<CharacterTableState, MouseActionProps<string>> = (
    state: CharacterTableState,
    props: OpenCharacterDetailsProps,
) => {
    const { payload: id } = props;
    const character = state.state.characters.find(x => x.frontendId === id);

    if (character === undefined) {
        console.log('Failed actions.openCharacterDetails');
        return state;
    }

    return {
        ...state,
        dom: { ...state.dom, modal: { type: 'CharacterDetailsModal', characterId: id } },
    };
};

export const closeModal: Reducer<CharacterTableState, void> = (state: CharacterTableState, _props: void) => {
    return { ...state, dom: { ...state.dom, modal: null } };
};
