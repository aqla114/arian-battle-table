import { CharacterTableState } from '../components/characters-table';
import {
    ChangeActionProps,
    ClickDropDownListItemProps,
    CharacterName,
    SkillName,
    MouseActionProps,
} from '../actions/actions';
import { updateItemInArray, updateObject } from '../../utils/reducer-commons';
import { characterSelector, indexSelector } from './reducers';
import { BadStatus } from '../actions/bad-status';
import { Attribute } from '../actions/attribute';
import { Character } from '../../types/character';
import { Skill } from '../../types/skill';

export const updateCharacterAttributeNumberText: (
    state: CharacterTableState,
    props: ChangeActionProps<CharacterName>,
) => CharacterTableState = (state, props) => {
    const { e, payload: name } = props;

    const characters = updateItemInArray(state.state.characters, characterSelector(name), item => {
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
    props: ChangeActionProps<CharacterName>,
) => CharacterTableState = (state, props) => {
    const { e, payload: name } = props;

    const characters = updateItemInArray(state.state.characters, characterSelector(name), item => {
        return updateObject(item, { [e.target.name]: e.target.value });
    });

    return { ...state, state: { ...state.state, characters } };
};

export const updateSkillAttributeText: (
    state: CharacterTableState,
    props: ChangeActionProps<{ characterName: CharacterName; skillIndex: number }>,
) => CharacterTableState = (state, props) => {
    const e = props.e;
    const { characterName, skillIndex } = props.payload;

    const characters = updateItemInArray(state.state.characters, characterSelector(characterName), character => {
        return updateObject(character, {
            skills: updateItemInArray(character.skills, indexSelector(skillIndex), skill =>
                updateObject(skill, { [e.target.name]: e.target.value }),
            ),
        });
    });

    const character = characters.find(characterSelector(characterName));

    if (character === undefined) {
        console.log('Failed actions.updateSkillAttributeText');
        return state;
    }

    return {
        ...state,
        state: { ...state.state, characters },
        dom: { ...state.dom, modal: { type: 'CharacterDetailsModal', character } },
    };
};

export const updateCharacterCheckbox: (
    state: CharacterTableState,
    props: ChangeActionProps<CharacterName>,
) => CharacterTableState = (state, props) => {
    const { e, payload: name } = props;
    const action = e.target.name;

    let characters;

    if (action === 'isActed') {
        characters = updateItemInArray(state.state.characters, characterSelector(name), item =>
            updateObject(item, { isActed: !item.isActed }),
        );
    } else {
        characters = updateItemInArray(state.state.characters, characterSelector(name), item =>
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
    const { key, value, name } = props;

    const characters = updateItemInArray(state.state.characters, characterSelector(name), item => {
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
    props: ChangeActionProps<CharacterName>,
) => CharacterTableState = (state, props) => {
    const { e, payload: name } = props;

    const characters = updateItemInArray(state.state.characters, characterSelector(name), item =>
        updateObject(item, { attribute: e.target.value as Attribute }),
    );

    return { ...state, state: { ...state.state, characters } };
};

export const addNewCharacter: (state: CharacterTableState) => CharacterTableState = state => {
    const characters = state.state.characters.slice().map(x => ({ ...x }));

    if (characters.some(x => x.name === state.current.currentNewCharacter.name)) {
        window.alert('すでに存在しているキャラクター名です。キャラクター名は別のものを入力してください。');
        return state;
    }

    if (state.current.currentNewCharacter.name === '') {
        window.alert('キャラクターネームが空白です。');
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

export const addNewSkill: (state: CharacterTableState) => CharacterTableState = state => {
    if (state.dom.modal?.type !== 'CharacterDetailsModal') {
        console.log('Failed addNewSkill');
        return state;
    }

    const characterName = state.dom.modal.character.name;

    const characters = updateItemInArray(state.state.characters, characterSelector(characterName), character =>
        updateObject(character, updateObject(character, { skills: [...character.skills, Skill()] })),
    );

    const character = characters.find(characterSelector(characterName));

    if (character === undefined) {
        console.log('Failed actions.deleteSkill');
        return state;
    }

    return {
        ...state,
        state: { ...state.state, characters },
        dom: { ...state.dom, modal: { type: 'CharacterDetailsModal', character } },
    };
};

export const copyCharacter: (state: CharacterTableState, props: { character: Character }) => CharacterTableState = (
    state,
    props,
) => {
    let { character } = props;

    const names = state.state.characters.map(x => x.name);
    let characterName = character.name;

    while (true) {
        if (names.includes(characterName)) {
            characterName = `${characterName}__copy`;
        } else {
            break;
        }
    }

    const { id: _, ...badStatusWithoutId } = character.badStatus;
    const { id: _id, ...characterWithoudId } = { ...character, name: characterName, badStatus: badStatusWithoutId };

    const characters: Character[] = [...state.state.characters, characterWithoudId].slice().map(x => ({ ...x }));

    return { ...state, state: { ...state.state, characters } };
};

export const deleteCharacter: (state: CharacterTableState, props: void) => CharacterTableState = (state, _) => {
    const characters = state.state.characters
        .slice()
        .map(x => ({ ...x }))
        .filter(x => x.name !== state.current.deleteCharacterName);

    return {
        ...state,
        state: { ...state.state, characters },
        current: { ...state.current, deleteCharacterName: '' },
        dom: { ...state.dom, modal: null },
    };
};

export const deleteSkill: (
    state: CharacterTableState,
    props: MouseActionProps<{ characterName: CharacterName; skillName: SkillName }>,
) => CharacterTableState = (state, props) => {
    const {
        payload: { characterName, skillName },
    } = props;

    const characters = updateItemInArray(state.state.characters, characterSelector(characterName), character => {
        const skills = character.skills.filter(s => s.name !== skillName);
        return updateObject(character, { skills });
    });

    const character = characters.find(characterSelector(characterName));

    if (character === undefined) {
        console.log('Failed actions.deleteSkill');
        return state;
    }

    return {
        ...state,
        state: { ...state.state, characters },
        dom: { ...state.dom, modal: { type: 'CharacterDetailsModal', character } },
    };
};
