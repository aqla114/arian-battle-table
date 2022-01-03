import { calculateMagicDefenceFactor } from '../../../types/attribute';
import { updateItemInArray, updateObject } from '../../../utils/reducer-commons';
import { AttackCharacterProps } from '../actions/attack-character';
import { UpdateDamageStateProps } from '../actions/update-damage-state';
import { State } from '../state';

export const updateDamageState: (state: State, props: UpdateDamageStateProps) => State = (state, props) => {
    return {
        ...state,
        state: { ...state.state, damage: updateObject(state.state.damage, props) },
        current: { ...state.current },
    };
};

export const attackCharacter: (state: State, props: AttackCharacterProps) => State = (state, props) => {
    const damage = state.state.damage;
    const updatedCharacters = updateItemInArray(
        state.state.characters,
        (item, _) => item.frontendId === damage.attackTarget,
        character => {
            const magicDefenceFactor = calculateMagicDefenceFactor(damage.damageAttribute, character.attribute);
            const defence =
                damage.damageAttribute === 'Physic'
                    ? character.physicalDefence
                    : magicDefenceFactor * character.magicalDefence;
            const finalDamage = Math.max(0, props.calculatedDamage - defence);

            return { ...character, hp: character.hp - finalDamage };
        },
    );

    return { ...state, state: updateObject(state.state, { characters: updatedCharacters }) };
};
