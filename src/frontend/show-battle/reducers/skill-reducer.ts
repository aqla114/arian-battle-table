import { FrontendSkill } from '../../types/skill';
import { updateItemInArray, updateObject } from '../../utils/reducer-commons';
import { ChangeActionProps, CharacterID, MouseActionProps, SkillName } from '../actions/actions';
import { CharacterTableState } from '../components/characters-table';
import { characterSelector, indexSelector } from './reducers';

export const updateSkillAttributeText: (
    state: CharacterTableState,
    props: ChangeActionProps<{ characterID: CharacterID; skillIndex: number }>,
) => CharacterTableState = (state, props) => {
    const e = props.e;
    const { characterID, skillIndex } = props.payload;

    const characters = updateItemInArray(state.state.characters, characterSelector(characterID), character => {
        return updateObject(character, {
            skills: updateItemInArray(character.skills, indexSelector(skillIndex), skill =>
                updateObject(skill, { [e.target.name]: e.target.value }),
            ),
        });
    });

    const character = characters.find(characterSelector(characterID));

    if (character === undefined) {
        console.log('Failed actions.updateSkillAttributeText');
        return state;
    }

    return {
        ...state,
        state: { ...state.state, characters },
    };
};

export const addNewSkill: (state: CharacterTableState) => CharacterTableState = state => {
    if (state.dom.modal?.type !== 'CharacterDetailsModal') {
        console.log('Failed addNewSkill');
        return state;
    }

    const characterID = state.dom.modal.characterID;

    const characters = updateItemInArray(state.state.characters, characterSelector(characterID), character =>
        updateObject(character, updateObject(character, { skills: [...character.skills, FrontendSkill()] })),
    );

    const character = characters.find(characterSelector(characterID));

    if (character === undefined) {
        console.log('Failed actions.deleteSkill');
        return state;
    }

    return {
        ...state,
        state: { ...state.state, characters },
    };
};

export const deleteSkill: (
    state: CharacterTableState,
    props: MouseActionProps<{ characterID: CharacterID; skillName: SkillName }>,
) => CharacterTableState = (state, props) => {
    const {
        payload: { characterID, skillName },
    } = props;

    const characters = updateItemInArray(state.state.characters, characterSelector(characterID), character => {
        const skills = character.skills.filter(s => s.name !== skillName);
        return updateObject(character, { skills });
    });

    const character = characters.find(characterSelector(characterID));

    if (character === undefined) {
        console.log('Failed actions.deleteSkill');
        return state;
    }

    return {
        ...state,
        state: { ...state.state, characters },
    };
};

export const moveSkill: (
    state: CharacterTableState,
    props: { characterID: CharacterID; dragIdx: number; dropIdx: number },
) => CharacterTableState = (state, props) => {
    const { characterID, dragIdx, dropIdx } = props;

    const characters = updateItemInArray(state.state.characters, characterSelector(characterID), character => {
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

    const character = characters.find(characterSelector(characterID));

    if (character === undefined) {
        console.log('Failed actions.moveSkill');
        return state;
    }

    return {
        ...state,
        state: updateObject(state.state, { characters }),
    };
};
