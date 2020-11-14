import * as uuid from 'uuid';
import { CharacterTableState } from '../components/characters-table';
import { ChangeActionProps, ClickDropDownListItemProps, CharacterID } from '../actions/actions';
import { updateItemInArray, updateObject } from '../../utils/reducer-commons';
import { characterSelector } from './reducers';
import { BadStatus } from '../../types/bad-status';
import { Attribute } from '../../types/attribute';
import { Character } from '../../types/character';

export const updateCharacterAttributeNumberText: (
    state: CharacterTableState,
    props: ChangeActionProps<CharacterID>,
) => CharacterTableState = (state, props) => {
    const { e, payload: id } = props;

    const characters = updateItemInArray(state.state.characters, characterSelector(id), item => {
        if (e.target.value === '' || e.target.value === '-') {
            return updateObject(item, { [e.target.name as keyof Character]: e.target.value });
        }

        const targetValue: number = parseInt(e.target.value);
        if (!isNaN(targetValue)) {
            return updateObject(item, { [e.target.name as keyof Character]: targetValue });
        } else {
            return item;
        }
    });

    characters.sort((a, b) => b.actionPriority - a.actionPriority);

    return { ...state, state: { ...state.state, characters } };
};

export const updateCharacterAttributeText: (
    state: CharacterTableState,
    props: ChangeActionProps<CharacterID>,
) => CharacterTableState = (state, props) => {
    const { e, payload: id } = props;

    const characters = updateItemInArray(state.state.characters, characterSelector(id), item => {
        return updateObject(item, { [e.target.name]: e.target.value });
    });

    return { ...state, state: { ...state.state, characters } };
};

export const updateCharacterCheckbox: (
    state: CharacterTableState,
    props: ChangeActionProps<CharacterID>,
) => CharacterTableState = (state, props) => {
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

export const updateButtonDropdownBadStatus: (
    state: CharacterTableState,
    props: ClickDropDownListItemProps,
) => CharacterTableState = (state, props) => {
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

export const updateCharacterAttributeDropdown: (
    state: CharacterTableState,
    props: ChangeActionProps<CharacterID>,
) => CharacterTableState = (state, props) => {
    const { e, payload: id } = props;

    const characters = updateItemInArray(state.state.characters, characterSelector(id), item =>
        updateObject(item, { attribute: e.target.value as Attribute }),
    );

    return { ...state, state: { ...state.state, characters } };
};

export const addNewCharacter: (state: CharacterTableState) => CharacterTableState = state => {
    const characters = state.state.characters.slice().map(x => ({ ...x }));

    state.current.currentNewCharacter.id = uuid.v4();

    characters.push(state.current.currentNewCharacter);
    characters.sort((a, b) => b.actionPriority - a.actionPriority);

    return {
        ...state,
        state: { ...state.state, characters },
        current: { ...state.current, currentNewCharacter: Character() },
    };
};

export const copyCharacter: (state: CharacterTableState, props: { character: Character }) => CharacterTableState = (
    state,
    props,
) => {
    let { character } = props;

    const { id: _, ...badStatusWithoutId } = character.badStatus;
    const { ...newCharacter } = { ...character, id: uuid.v4(), badStatus: badStatusWithoutId };

    const characters: Character[] = [...state.state.characters, newCharacter].slice().map(x => ({ ...x }));

    return { ...state, state: { ...state.state, characters } };
};

export const deleteCharacter: (state: CharacterTableState, props: void) => CharacterTableState = (state, _) => {
    const characters = state.state.characters
        .slice()
        .map(x => ({ ...x }))
        .filter(x => x.id !== state.current.deleteCharacterID);

    return {
        ...state,
        state: { ...state.state, characters },
        current: { ...state.current, deleteCharacterID: '' },
        dom: { ...state.dom, modal: null },
    };
};
