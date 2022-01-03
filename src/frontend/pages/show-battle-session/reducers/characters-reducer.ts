import * as uuid from 'uuid';
import { toast } from 'react-toastify';

import { updateItemInArray, updateObject } from '../../../utils/reducer-commons';
import { characterSelector } from './reducers';
import { BadStatus } from '../../../types/bad-status';
import { Attribute } from '../../../types/attribute';
import { FrontendCharacter } from '../../../types/character';
import { DoneLoadingCharactersSuccess } from '../actions/load-characters';
import { DoneSaveCharactersSuccess } from '../actions/save-characters';
import { UpdateCharacterAttributeTextProps } from '../actions/update-character-attribute-text';
import { UpdateCharacterCheckboxProps } from '../actions/update-character-checkbox';
import { UpdateButtonDropdownBadStatusProps } from '../actions/update-button-dropdown-bad-status';
import { CopyCharacterProps } from '../actions/copy-character';
import { UpdateCharacterAttributeNumberProps } from '../actions/update-character-attribute-number-text';
import { UpdateCharacterAttributeDropdownProps } from '../actions/update-character-attribute-dropdown';
import { State } from '../state';

export const updateCharacterAttributeNumber: (state: State, props: UpdateCharacterAttributeNumberProps) => State = (
    state,
    props,
) => {
    const { e, payload: id } = props;

    const characters = updateItemInArray(state.state.characters, characterSelector(id), item => {
        if (e.target.value === '' || e.target.value === '-') {
            return updateObject(item, { [e.target.name as keyof FrontendCharacter]: e.target.value });
        }

        const targetValue: number = parseInt(e.target.value);
        if (!isNaN(targetValue)) {
            return updateObject(item, { [e.target.name as keyof FrontendCharacter]: targetValue });
        } else {
            return item;
        }
    });

    characters.sort((a, b) => b.actionPriority - a.actionPriority);

    return { ...state, state: { ...state.state, characters } };
};

export const updateCharacterAttributeText: (state: State, props: UpdateCharacterAttributeTextProps) => State = (
    state,
    props,
) => {
    const { e, payload: id } = props;

    const characters = updateItemInArray(state.state.characters, characterSelector(id), item => {
        return updateObject(item, { [e.target.name]: e.target.value });
    });

    return { ...state, state: { ...state.state, characters } };
};

export const updateCharacterCheckbox: (state: State, props: UpdateCharacterCheckboxProps) => State = (state, props) => {
    const { e, payload: id } = props;
    const action = e.target.name;

    let characters;

    if (action === 'isActed') {
        characters = updateItemInArray(state.state.characters, characterSelector(id), item =>
            updateObject(item, { isActed: !item.isActed }),
        );
    } else {
        characters = updateItemInArray(state.state.characters, characterSelector(id), item =>
            updateObject(item, {
                badStatus: updateObject(item.badStatus, {
                    [action]: !item.badStatus[action as keyof BadStatus],
                }),
            }),
        );
    }

    return { ...state, state: { ...state.state, characters } };
};

export const updateButtonDropdownBadStatus: (state: State, props: UpdateButtonDropdownBadStatusProps) => State = (
    state,
    props,
) => {
    const { key, value, characterId } = props;

    const characters = updateItemInArray(state.state.characters, characterSelector(characterId), item => {
        // knockback の更新 -> 行動値の更新 という2ステップを同時に行えないので updateObject を2回呼んでいる。
        const tmp = updateObject(item, {
            badStatus: updateObject(item.badStatus, {
                [key]: value,
            }),
        });

        return updateObject(tmp, {
            actionPriority: tmp.actionPriority - (tmp.badStatus.knockback - item.badStatus.knockback) * 5,
        });
    });

    if (key === 'knockback') {
        characters.sort((a, b) => b.actionPriority - a.actionPriority);
    }

    return { ...state, state: { ...state.state, characters } };
};

export const updateCharacterAttributeDropdown: (state: State, props: UpdateCharacterAttributeDropdownProps) => State = (
    state,
    props,
) => {
    const { e, payload: id } = props;

    const characters = updateItemInArray(state.state.characters, characterSelector(id), item =>
        updateObject(item, { attribute: e.target.value as Attribute }),
    );

    return { ...state, state: { ...state.state, characters } };
};

export const addNewCharacter: (state: State) => State = state => {
    const characters = state.state.characters.slice().map(x => ({ ...x }));

    const newCharacter = FrontendCharacter();

    characters.push(newCharacter);
    characters.sort((a, b) => b.actionPriority - a.actionPriority);

    return {
        ...state,
        state: { ...state.state, characters },
        current: { ...state.current },
    };
};

export const copyCharacter: (state: State, props: CopyCharacterProps) => State = (state, props) => {
    let { character } = props;

    const { id: _, ...badStatusWithoutId } = character.badStatus;
    const newCharacter: FrontendCharacter = {
        ...character,
        id: undefined,
        badStatus: badStatusWithoutId,
        frontendId: uuid.v4(),
    };

    const characters: FrontendCharacter[] = [...state.state.characters, newCharacter].slice().map(x => ({ ...x }));

    return { ...state, state: { ...state.state, characters } };
};

export const deleteCharacter: (state: State, props: void) => State = (state, _) => {
    const characters = state.state.characters
        .slice()
        .map(x => ({ ...x }))
        .filter(x => x.frontendId !== state.current.deleteCharacterID);

    return {
        ...state,
        state: { ...state.state, characters },
        current: { ...state.current, deleteCharacterID: '' },
        dom: { ...state.dom, modal: null },
    };
};

export const doneLoadingCharacters: (state: State, props: DoneLoadingCharactersSuccess) => State = (state, props) => {
    const firstCharacterId = props.result.characters.length > 0 ? props.result.characters[0].frontendId : '';

    return {
        ...state,
        state: {
            ...state.state,
            ...props.result,
            damage: updateObject(state.state.damage, { attackTarget: firstCharacterId }),
        },
        current: { ...state.current, history: [{ ...state.state, ...props.result }] },
    };
};

export const doneSaving: (state: State, props: DoneSaveCharactersSuccess) => State = (state, _) => {
    toast.success('戦況を保存しました。');
    return {
        ...state,
        current: { ...state.current, unsaved: false },
    };
};

export const startedSavingNewly: (state: State, props: {}) => State = (state, _) => {
    return {
        ...state,
        current: { ...state.current, unsaved: false },
    };
};

export const restoreHistory: (state: State, props: void) => State = (state, _) => {
    const historyLength = state.current.history.length;

    // 1つ前の State に戻す。 history の最後の要素は現在の State が入っているので1つ前を取り出している。
    const lastState = historyLength > 1 ? state.current.history[historyLength - 2] : state.state;
    const history = historyLength > 1 ? state.current.history.slice(0, -1) : state.current.history;

    return {
        ...state,
        state: { ...lastState },
        current: { ...state.current, history },
    };
};
