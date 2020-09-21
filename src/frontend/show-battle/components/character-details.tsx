import * as React from 'react';

import { InputField } from '../../components/atoms/input-field';
import { attributeLabels } from '../actions/attribute';
import { Character } from '../../types/character';
import { SkillName } from '../actions/actions';

export type CharacterDetailsProps = {
    character: Character;
    onChangeElementSkillText: (e: React.ChangeEvent<HTMLInputElement>, skillName: SkillName) => void;
    onChangeNumberInputField: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onCloseModal: () => void;
};

export const CharacterDetails: React.SFC<CharacterDetailsProps> = (props: CharacterDetailsProps) => {
    return (
        <div
            className="side-modal-wrapper"
            onClick={e => {
                // EventTarget、必ずしも Element じゃなくて window とかの場合もあるので、HTMLDivElement の instance であることを確認する。
                // modal-window の外側をクリックしたときのみモーダルを閉じるようにしたい。
                // TODO: ここもしかしたら処理を reducer に移した方がいいかもしれん。
                if (e.target instanceof HTMLDivElement && e.target.className === 'side-modal-wrapper')
                    props.onCloseModal();
            }}
        >
            <div className="side-window">
                <CharacterDetailsContent {...props} />
            </div>
        </div>
    );
};

const CharacterDetailsContent: React.SFC<CharacterDetailsProps> = (props: CharacterDetailsProps) => {
    const { character, onChangeNumberInputField, onChangeElementSkillText: onChangeElementText } = props;

    return (
        <div className="character-details">
            <div className="character-details__name">{character.name}</div>
            <div className="character-details__attribute-values">
                <div className="character-details__attribute-values__title">能力値・HP・MP</div>
                <table className="character-details__attribute-values__table1">
                    <thead>
                        <tr>
                            <td>最大HP</td>
                            <td>物防</td>
                            <td>魔防</td>
                            <td>属性</td>
                            <td>行動値</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="character-details__attribute-values__table1__hp">
                                <InputField
                                    name={'maxHp'}
                                    value={character.maxHp}
                                    kind="number"
                                    onChange={onChangeNumberInputField}
                                    showBorder={false}
                                    textAlign={'right'}
                                />
                            </td>
                            <td className="character-details__attribute-values__table1__physical-defence">
                                <InputField
                                    name={'physicalDefence'}
                                    value={character.physicalDefence}
                                    kind="number"
                                    onChange={onChangeNumberInputField}
                                    showBorder={false}
                                    textAlign={'right'}
                                />
                            </td>
                            <td className="character-details__attribute-values__table1__magical-defence">
                                <InputField
                                    name={'magicalDefence'}
                                    value={character.magicalDefence}
                                    kind="number"
                                    onChange={onChangeNumberInputField}
                                    showBorder={false}
                                    textAlign={'right'}
                                />
                            </td>
                            <td className="character-details__attribute-values__table1__attribute">
                                {attributeLabels[character.attribute]}
                            </td>
                            <td className="character-details__attribute-values__table1__action-priority">
                                <InputField
                                    name={'actionPriority'}
                                    value={character.actionPriority}
                                    kind="number"
                                    onChange={onChangeNumberInputField}
                                    showBorder={false}
                                    textAlign={'right'}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <table className="character-details__attribute-values__table2">
                    <thead>
                        <tr>
                            <td>筋力</td>
                            <td>器用</td>
                            <td>敏捷</td>
                            <td>知力</td>
                            <td>感知</td>
                            <td>精神</td>
                            <td>幸運</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <InputField
                                    name={'strength'}
                                    value={character.strength}
                                    kind="number"
                                    onChange={onChangeNumberInputField}
                                    showBorder={false}
                                    textAlign={'right'}
                                />
                            </td>
                            <td>
                                <InputField
                                    name={'dexterity'}
                                    value={character.dexterity}
                                    kind="number"
                                    onChange={onChangeNumberInputField}
                                    showBorder={false}
                                    textAlign={'right'}
                                />
                            </td>
                            <td>
                                <InputField
                                    name={'agility'}
                                    value={character.agility}
                                    kind="number"
                                    onChange={onChangeNumberInputField}
                                    showBorder={false}
                                    textAlign={'right'}
                                />
                            </td>
                            <td>
                                <InputField
                                    name={'wisdom'}
                                    value={character.wisdom}
                                    kind="number"
                                    onChange={onChangeNumberInputField}
                                    showBorder={false}
                                    textAlign={'right'}
                                />
                            </td>
                            <td>
                                <InputField
                                    name={'sensitivity'}
                                    value={character.sensitivity}
                                    kind="number"
                                    onChange={onChangeNumberInputField}
                                    showBorder={false}
                                    textAlign={'right'}
                                />
                            </td>
                            <td>
                                <InputField
                                    name={'power'}
                                    value={character.power}
                                    kind="number"
                                    onChange={onChangeNumberInputField}
                                    showBorder={false}
                                    textAlign={'right'}
                                />
                            </td>
                            <td>
                                <InputField
                                    name={'luck'}
                                    value={character.luck}
                                    kind="number"
                                    onChange={onChangeNumberInputField}
                                    showBorder={false}
                                    textAlign={'right'}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="character-details__skills">
                <div className="character-details__skills__title">スキル</div>
                <table className="character-details__skills__table">
                    <thead>
                        <tr>
                            <td>スキル名</td>
                            <td>タイミング</td>
                            <td>判定</td>
                            <td>対象</td>
                            <td>射程</td>
                            <td>使用条件</td>
                            <td>効果</td>
                        </tr>
                    </thead>
                    <tbody>
                        {character.skills.map(skill => (
                            <tr key={skill.name} className="character-details__skills__table__skill">
                                <td className="character-details__skills__table__skill__name">
                                    <InputField
                                        name={'name'}
                                        value={skill.name}
                                        kind={'text'}
                                        onChange={e => onChangeElementText(e, skill.name)}
                                    />
                                </td>
                                <td className="character-details__skills__table__skill__timing">
                                    <InputField
                                        name={'timing'}
                                        value={skill.timing}
                                        kind={'text'}
                                        onChange={e => onChangeElementText(e, skill.name)}
                                    />
                                </td>
                                <td className="character-details__skills__table__skill__detetmination-way">
                                    <InputField
                                        name={'determimnation-way'}
                                        value={skill.detemination_way}
                                        kind={'text'}
                                        size={'small'}
                                        onChange={e => onChangeElementText(e, skill.name)}
                                    />
                                </td>
                                <td className="character-details__skills__table__skill__target">
                                    <InputField
                                        name={'target'}
                                        value={skill.target}
                                        kind={'text'}
                                        size={'small'}
                                        onChange={e => onChangeElementText(e, skill.name)}
                                    />
                                </td>
                                <td className="character-details__skills__table__skill__range">
                                    <InputField
                                        name={'range'}
                                        value={skill.range}
                                        kind={'text'}
                                        size={'small'}
                                        onChange={e => onChangeElementText(e, skill.name)}
                                    />
                                </td>
                                <td className="character-details__skills__table__skill__restriction">
                                    <InputField
                                        name={'restriction'}
                                        value={skill.restriction}
                                        kind={'text'}
                                        onChange={e => onChangeElementText(e, skill.name)}
                                    />
                                </td>
                                <td className="character-details__skills__table__skill__detail">
                                    <InputField
                                        name={'detail'}
                                        value={skill.detail}
                                        kind={'text'}
                                        size={'large'}
                                        onChange={e => onChangeElementText(e, skill.name)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
