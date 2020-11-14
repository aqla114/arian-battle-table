//import { Uuid } from 'node-ts-uuid';
import { CharacterTableState } from '../components/characters-table';
import { ChangeActionProps, ClickDropDownListItemProps, CharacterUUID } from '../actions/actions';
import { updateItemInArray, updateObject } from '../../utils/reducer-commons';
import { characterSelector } from './reducers';
import { BadStatus } from '../../types/bad-status';
import { Attribute } from '../../types/attribute';
import { Character } from '../../types/character';

export const updateCharacterAttributeNumberText: (
    state: CharacterTableState,
    props: ChangeActionProps<CharacterUUID>,
) => CharacterTableState = (state, props) => {
    const { e, payload: uuid } = props;

    const characters = updateItemInArray(state.state.characters, characterSelector(uuid), item => {
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
    props: ChangeActionProps<CharacterUUID>,
) => CharacterTableState = (state, props) => {
    const { e, payload: uuid } = props;

    const characters = updateItemInArray(state.state.characters, characterSelector(uuid), item => {
        return updateObject(item, { [e.target.name]: e.target.value });
    });

    return { ...state, state: { ...state.state, characters } };
};

export const updateCharacterCheckbox: (
    state: CharacterTableState,
    props: ChangeActionProps<CharacterUUID>,
) => CharacterTableState = (state, props) => {
    const { e, payload: uuid } = props;
    const action = e.target.name;

    let characters;

    if (action === 'isActed') {
        characters = updateItemInArray(state.state.characters, characterSelector(uuid), item =>
            updateObject(item, { isActed: !item.isActed }),
        );
    } else {
        characters = updateItemInArray(state.state.characters, characterSelector(uuid), item =>
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
    const { key, value, uuid } = props;

    const characters = updateItemInArray(state.state.characters, characterSelector(uuid), item => {
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
    props: ChangeActionProps<CharacterUUID>,
) => CharacterTableState = (state, props) => {
    const { e, payload: uuid } = props;

    const characters = updateItemInArray(state.state.characters, characterSelector(uuid), item =>
        updateObject(item, { attribute: e.target.value as Attribute }),
    );

    return { ...state, state: { ...state.state, characters } };
};

export const addNewCharacter: (state: CharacterTableState) => CharacterTableState = state => {
    const characters = state.state.characters.slice().map(x => ({ ...x }));

    state.current.currentNewCharacter.uuid = 1;  //Uuid.generate();
    if (characters.some(x => x.uuid === state.current.currentNewCharacter.uuid)) {
        window.alert('UUIDが重複しています。管理者にお知らせください。');
        return state;
    }

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
    const uuid: CharacterUUID = 2;  //Uuid.generate();

    const { id: _, ...badStatusWithoutId } = character.badStatus;
    const { ...characterWithoudId } = { ...character, uuid: uuid, badStatus: badStatusWithoutId };

    const characters: Character[] = [...state.state.characters, characterWithoudId].slice().map(x => ({ ...x }));

    return { ...state, state: { ...state.state, characters } };
};

export const deleteCharacter: (state: CharacterTableState, props: void) => CharacterTableState = (state, _) => {
    const characters = state.state.characters
        .slice()
        .map(x => ({ ...x }))
        .filter(x => x.uuid !== state.current.deleteCharacterUUID);

    return {
        ...state,
        state: { ...state.state, characters },
        current: { ...state.current, deleteCharacterUUID: 0 },
        dom: { ...state.dom, modal: null },
    };
};
