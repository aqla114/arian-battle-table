import * as React from 'react';
import { useDispatch } from 'react-redux';
import { Dropdown } from '../../../components/atoms/dropdown';
import { InputField } from '../../../components/atoms/input-field';
import { CardContainer } from '../../../components/card-container';
import { damageAttributeLabels, DamageAttributeRaw } from '../../../types/attribute';
import { FrontendCharacter } from '../../../types/character';
import { actions, CharacterId } from '../actions/actions';

type Props = {
    roleResult: number;
    fixedDamage: number;
    damageAttribute: DamageAttributeRaw;
    attackTarget: CharacterId;
    characters: Pick<FrontendCharacter, 'frontendId' | 'name'>[];
};

export const DamageCalculator: React.FC<Props> = ({
    roleResult,
    damageAttribute,
    fixedDamage,
    characters,
    attackTarget,
}) => {
    const attributeOptions = Object.entries(damageAttributeLabels).map(([key, label]) => (
        <option value={key} key={key}>
            {label}
        </option>
    ));

    const characterOptions = characters.map(character => (
        <option key={character.frontendId} value={character.frontendId}>
            {character.name}
        </option>
    ));

    const attackTargetCharacter =
        characters.length > 0 ? characters.find(x => x.frontendId === attackTarget) || characters[0] : null;

    const calculatedDamage = roleResult + fixedDamage;

    const dispatch = useDispatch();

    return (
        <CardContainer className="damage-calculator">
            <div className="damage-calculator__container">
                <div className="damage-role-referer">
                    <div className="damage-role-referer__label">ダメージロール</div>
                    <div className="damage-role-referer__value">{roleResult}</div>
                </div>
                <div>+</div>
                <div className="fixed-damage">
                    <div className="fixed-damage__label">固定値</div>
                    <InputField
                        name={'fixed-damage'}
                        value={fixedDamage}
                        kind={'number'}
                        className="fixed-damage__value"
                        onChange={e => dispatch(actions.updateDamageState({ fixedDamage: parseInt(e.target.value) }))}
                    />
                </div>
                <div>=</div>
                <div className="calculated-damage">
                    <div className="calculated-damage__label">ダメージ</div>
                    <div className="calculated-damage__value">{calculatedDamage}</div>
                </div>
                <div className="damage-attribute">
                    <div className="damage-attribute__label">属性</div>
                    <Dropdown
                        className="damage-attribute__value"
                        options={attributeOptions}
                        value={damageAttribute}
                        onChange={e => dispatch(actions.updateDamageState({ damageAttribute: e.target.value }))}
                    />
                </div>
                <div className="damage-target">
                    <div className="damage-target__label">対象</div>
                    {attackTarget !== null ? (
                        <Dropdown
                            options={characterOptions}
                            value={attackTargetCharacter?.frontendId || ''}
                            onChange={e => dispatch(actions.updateDamageState({ attackTarget: e.target.value }))}
                            className="damage-target__value"
                        />
                    ) : null}
                </div>
            </div>
        </CardContainer>
    );
};
