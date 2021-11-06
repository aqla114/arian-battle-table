import { Reducer } from 'react';
import { MouseActionProps } from '../../types/actions';
import { updateObject } from '../../utils/reducer-commons';
import { OpenCharacterDetailsProps } from '../actions/open-character-details';
import { OpenDeletionModalProps } from '../actions/open-deletion-modal';
import { State } from '../state';

export const openDeletionModal: Reducer<State, MouseActionProps<string>> = (
    state: State,
    props: OpenDeletionModalProps,
) => {
    return {
        ...state,
        current: updateObject(state.current, { deleteCharacterID: props.payload }),
        dom: updateObject(state.dom, { modal: { type: 'DeletionModal' } }),
    };
};

export const openCharacterDetails: Reducer<State, MouseActionProps<string>> = (
    state: State,
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

export const closeModal: Reducer<State, void> = (state: State, _props: void) => {
    return { ...state, dom: { ...state.dom, modal: null } };
};
