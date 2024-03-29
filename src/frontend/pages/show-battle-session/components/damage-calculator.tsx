import * as React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '../../../components/atoms/button';
import { CheckBox } from '../../../components/atoms/checkbox';
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
    roleResult: _roleResult,
    damageAttribute,
    fixedDamage,
    characters,
    attackTarget,
}) => {
    const attackTargetCharacter =
        characters.length > 0 ? characters.find(x => x.frontendId === attackTarget) || characters[0] : null;

    const [usingRoleResult, setUsingRoleResult] = React.useState(true);

    const roleResult = _roleResult * Number(usingRoleResult);

    // Number(true) === 1, Number(false) === 0 を利用している。
    const calculatedDamage = roleResult + fixedDamage;

    const dispatch = useDispatch();

    return (
        <CardContainer className="damage-calculator">
            <div className="damage-calculator__container">
                <div className="using-damage-role">
                    <div className="using-damage-role__label">DRを参照</div>
                    <div className="using-damage-role__value">
                        <CheckBox
                            name={'using-damage-role'}
                            checked={usingRoleResult}
                            onChange={() => setUsingRoleResult(!usingRoleResult)}
                        />
                    </div>
                </div>
                <div className="damage-role-referer">
                    <div className="damage-role-referer__label">ダメージロール</div>
                    <div className="damage-role-referer__value">{usingRoleResult ? roleResult : '-'}</div>
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
                        value={damageAttribute}
                        onChange={e => dispatch(actions.updateDamageState({ damageAttribute: e.target.value }))}
                    >
                        {Object.entries(damageAttributeLabels).map(([key, label]) => (
                            <option value={key} key={key}>
                                {label}
                            </option>
                        ))}
                    </Dropdown>
                </div>
                <div className="damage-target">
                    <div className="damage-target__label">対象</div>
                    {attackTargetCharacter !== null ? (
                        <Dropdown
                            value={attackTargetCharacter.frontendId}
                            onChange={e => dispatch(actions.updateDamageState({ attackTarget: e.target.value }))}
                            className="damage-target__value"
                        >
                            {characters.map(character => (
                                <option key={character.frontendId} value={character.frontendId}>
                                    {character.name}
                                </option>
                            ))}
                        </Dropdown>
                    ) : null}
                </div>
                <Button
                    name="attack-button"
                    value="攻撃"
                    kind="delete"
                    onClick={() => dispatch(actions.attackCharacter({ calculatedDamage }))}
                />
            </div>
        </CardContainer>
    );
};
