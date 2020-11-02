import { Skill } from '../../types/skill';
import { updateItemInArray, updateObject } from '../../utils/reducer-commons';
import { ChangeActionProps, CharacterName, MouseActionProps, SkillName } from '../actions/actions';
import { CharacterTableState } from '../components/characters-table';
import { characterSelector, indexSelector } from './reducers';

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

export const moveSkill: (
    state: CharacterTableState,
    props: { characterName: CharacterName; dragIdx: number; dropIdx: number },
) => CharacterTableState = (state, props) => {
    const { characterName, dragIdx, dropIdx } = props;

    const characters = updateItemInArray(state.state.characters, characterSelector(characterName), character => {
        const smallIdx = Math.min(dragIdx, dropIdx);
        const largeIdx = Math.max(dragIdx, dropIdx);

        const skills1 = character.skills.slice(0, smallIdx);
        const skill1 = character.skills[smallIdx];
        const skills2 = character.skills.slice(smallIdx + 1, largeIdx);
        const skill2 = character.skills[largeIdx];
        const skills3 = character.skills.slice(largeIdx + 1);

        const skills = skills1.concat(skill2, skills2, skill1, skills3);

        return updateObject(character, { skills });
    });

    const character = characters.find(characterSelector(characterName));

    if (character === undefined) {
        console.log('Failed actions.moveSkill');
        return state;
    }

    return {
        ...state,
        state: updateObject(state.state, { characters }),
        dom: updateObject(state.dom, { modal: { type: 'CharacterDetailsModal', character } }),
    };
};
