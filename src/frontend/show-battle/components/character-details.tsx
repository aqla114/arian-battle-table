import * as React from 'react';

import { CharacterProps } from './characters-table';
import { InputField } from '../../components/atoms/input-field';

export type CharacterDetailsProps = {
    character: CharacterProps;
    onChangeNumberInputField: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onCloseModal: () => void;
};

export const CharacterDetails: React.SFC<CharacterDetailsProps> = (props: CharacterDetailsProps) => {
    return (
        <div className="side-modal-wrapper" onClick={props.onCloseModal}>
            <div className="side-window">
                <CharacterDetailsContent {...props} />
            </div>
        </div>
    );
};

const CharacterDetailsContent: React.SFC<CharacterDetailsProps> = (props: CharacterDetailsProps) => {
    const { character, onChangeNumberInputField } = props;

    character.skills = [
        {
            name: 'バッシュ',
            timing: 'メジャーアクション',
            detemination_way: '命中',
            target: '単体',
            range: '武器',
            restriction: '-',
            detail: '武器攻撃を行う。その武器攻撃のダメージに+[SL]Dする。',
        },
        {
            name: 'カバーリング',
            timing: 'DR直前',
            detemination_way: '自動成功',
            target: '単体',
            range: '至近',
            restriction: '防御中1回',
            detail: '対象にカバーを行う。',
        },
    ];

    return (
        <div className="character-details">
            <div className="character-details__name">{character.name}</div>
            <div className="character-details__attribute-values">
                <div className="character-details__attribute-values__title">能力値・HP・MP</div>
                <table className="character-details__attribute-values__table1">
                    <thead>
                        <tr>
                            <td>最大HP</td>
                            <td>物理防御力</td>
                            <td>魔法防御力</td>
                            <td>属性</td>
                            <td>行動値</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <InputField
                                    name={'maxHp'}
                                    value={character.maxHp}
                                    kind="number"
                                    onChange={onChangeNumberInputField}
                                    showBorder={false}
                                />
                            </td>
                            <td>
                                <InputField
                                    name={'physicalDefence'}
                                    value={character.physicalDefence}
                                    kind="number"
                                    onChange={onChangeNumberInputField}
                                    showBorder={false}
                                />
                            </td>
                            <td>
                                <InputField
                                    name={'magicalDefence'}
                                    value={character.magicalDefence}
                                    kind="number"
                                    onChange={onChangeNumberInputField}
                                    showBorder={false}
                                />
                            </td>
                            <td>{character.attribute}</td>
                            <td>
                                <InputField
                                    name={'actionPriority'}
                                    value={character.actionPriority}
                                    kind="number"
                                    onChange={onChangeNumberInputField}
                                    showBorder={false}
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
                                />
                            </td>
                            <td>
                                <InputField
                                    name={'dexterity'}
                                    value={character.dexterity}
                                    kind="number"
                                    onChange={onChangeNumberInputField}
                                    showBorder={false}
                                />
                            </td>
                            <td>
                                <InputField
                                    name={'agility'}
                                    value={character.agility}
                                    kind="number"
                                    onChange={onChangeNumberInputField}
                                    showBorder={false}
                                />
                            </td>
                            <td>
                                <InputField
                                    name={'wisdom'}
                                    value={character.wisdom}
                                    kind="number"
                                    onChange={onChangeNumberInputField}
                                    showBorder={false}
                                />
                            </td>
                            <td>
                                <InputField
                                    name={'sensitivity'}
                                    value={character.sensitivity}
                                    kind="number"
                                    onChange={onChangeNumberInputField}
                                    showBorder={false}
                                />
                            </td>
                            <td>
                                <InputField
                                    name={'power'}
                                    value={character.power}
                                    kind="number"
                                    onChange={onChangeNumberInputField}
                                    showBorder={false}
                                />
                            </td>
                            <td>
                                <InputField
                                    name={'luck'}
                                    value={character.luck}
                                    kind="number"
                                    onChange={onChangeNumberInputField}
                                    showBorder={false}
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
                            <tr key={skill.name}>
                                <td>{skill.name}</td>
                                <td>{skill.timing}</td>
                                <td>{skill.detemination_way}</td>
                                <td>{skill.target}</td>
                                <td>{skill.range}</td>
                                <td>{skill.restriction}</td>
                                <td>{skill.detail}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
