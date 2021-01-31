import * as React from 'react';
import { faTrashAlt, faPlusSquare } from '@fortawesome/free-regular-svg-icons';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDrag, useDrop } from 'react-dnd';

import { InputField } from '../../components/atoms/input-field';
import { attributeLabels } from '../../types/attribute';
import { FrontendCharacter } from '../../types/character';
import { CharacterId } from '../actions/actions';
import { IconButton } from '../../components/atoms/icon-button';
import { FrontendSkill, SkillId } from '../../types/skill';
import { Textarea } from '../../components/atoms/textarea';

export type CharacterDetailsProps = {
    character: FrontendCharacter;
    onChangeElementSkillText: (e: React.ChangeEvent<HTMLInputElement>, idx: number) => void;
    onChangeNumberInputField: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onChangeTextInputField: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onClickAddSkillButton: (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => void;
    onClickDeleteSkillButton: (e: React.MouseEvent<HTMLInputElement, MouseEvent>, skillId: SkillId) => void;
    onMoveSkill: (dragIdx: number, dropIdx: number) => void;
    onCloseModal: () => void;
    onLoadSkillsCsv: (characterId: CharacterId, files: FileList | null) => void;
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
                <DndProvider backend={HTML5Backend}>
                    <CharacterDetailsContent {...props} />
                </DndProvider>
            </div>
        </div>
    );
};

const CharacterDetailsContent: React.FunctionComponent<CharacterDetailsProps> = (props: CharacterDetailsProps) => {
    const {
        character,
        onChangeNumberInputField,
        onChangeTextInputField,
        onChangeElementSkillText,
        onClickAddSkillButton,
        onClickDeleteSkillButton,
        onMoveSkill,
        onLoadSkillsCsv,
    } = props;

    return (
        <div className="character-details">
            <div className="character-details__name">{character.name}</div>
            <div className="character-details__attribute-values">
                <div className="character-details__attribute-values__title">能力値・HP・MP</div>
                <table className="character-details__attribute-values__table1">
                    <thead>
                        <tr>
                            <th>最大HP</th>
                            <th>物防</th>
                            <th>魔防</th>
                            <th>属性</th>
                            <th>行動値 / 初期</th>
                            <th>移動力 / 初期</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="character-details__attribute-values__table1__hp">
                                <ParameterInputField
                                    name={'maxHp'}
                                    value={character.maxHp}
                                    onChange={onChangeNumberInputField}
                                />
                            </td>
                            <td className="character-details__attribute-values__table1__physical-defence">
                                <ParameterInputField
                                    name={'physicalDefence'}
                                    value={character.physicalDefence}
                                    onChange={onChangeNumberInputField}
                                />
                            </td>
                            <td className="character-details__attribute-values__table1__magical-defence">
                                <ParameterInputField
                                    name={'magicalDefence'}
                                    value={character.magicalDefence}
                                    onChange={onChangeNumberInputField}
                                />
                            </td>
                            <td className="character-details__attribute-values__table1__attribute">
                                {attributeLabels[character.attribute]}
                            </td>
                            <td className="character-details__attribute-values__table1__action-priority">
                                <ParameterInputField
                                    name={'actionPriority'}
                                    value={character.actionPriority}
                                    onChange={onChangeNumberInputField}
                                />
                                {'/'}
                                <ParameterInputField
                                    name={'defaultActionPriority'}
                                    value={character.defaultActionPriority}
                                    onChange={onChangeNumberInputField}
                                />
                            </td>
                            <td className="character-details__attribute-values__table1__mobility">
                                <ParameterInputField
                                    name={'mobility'}
                                    value={character.mobility}
                                    onChange={onChangeNumberInputField}
                                />
                                {'/'}
                                <ParameterInputField
                                    name={'defaultMobility'}
                                    value={character.defaultMobility}
                                    onChange={onChangeNumberInputField}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <table className="character-details__attribute-values__table2">
                    <thead>
                        <tr>
                            <th>筋力</th>
                            <th>器用</th>
                            <th>敏捷</th>
                            <th>知力</th>
                            <th>感知</th>
                            <th>精神</th>
                            <th>幸運</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <ParameterInputField
                                    name={'strength'}
                                    value={character.strength}
                                    onChange={onChangeNumberInputField}
                                />
                            </td>
                            <td>
                                <ParameterInputField
                                    name={'dexterity'}
                                    value={character.dexterity}
                                    onChange={onChangeNumberInputField}
                                />
                            </td>
                            <td>
                                <ParameterInputField
                                    name={'agility'}
                                    value={character.agility}
                                    onChange={onChangeNumberInputField}
                                />
                            </td>
                            <td>
                                <ParameterInputField
                                    name={'wisdom'}
                                    value={character.wisdom}
                                    onChange={onChangeNumberInputField}
                                />
                            </td>
                            <td>
                                <ParameterInputField
                                    name={'sensitivity'}
                                    value={character.sensitivity}
                                    onChange={onChangeNumberInputField}
                                />
                            </td>
                            <td>
                                <ParameterInputField
                                    name={'power'}
                                    value={character.power}
                                    onChange={onChangeNumberInputField}
                                />
                            </td>
                            <td>
                                <ParameterInputField
                                    name={'luck'}
                                    value={character.luck}
                                    onChange={onChangeNumberInputField}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="character-details__memo">
                <div className="character-details__memo__label">メモ</div>
                <div className="character-details__memo__memo">
                    <Textarea
                        name="memo"
                        value={character.memo}
                        onChange={onChangeTextInputField}
                        style={{ width: '100%', height: '160px' }}
                    />
                </div>
            </div>
            <div className="character-details__skills">
                <div className="character-details__skills__title">スキル</div>
                <input
                    type="file"
                    name="upload"
                    onChange={e => {
                        console.log(e.target.files);
                        onLoadSkillsCsv(character.frontendId, e.target.files);
                    }}
                />
                <table className="character-details__skills__table">
                    <thead>
                        <tr>
                            <th>タイミング</th>
                            <th>スキル名</th>
                            <th>判定</th>
                            <th>対象</th>
                            <th>射程</th>
                            <th>使用条件</th>
                            <th>効果</th>
                            <th>削除</th>
                        </tr>
                    </thead>
                    <tbody>
                        {character.skills.map((skill, idx) => (
                            <DraggableSkillTableRow
                                key={skill.frontendId}
                                skill={skill}
                                idx={idx}
                                onChangeElementSkillText={onChangeElementSkillText}
                                onClickDeleteSkillButton={onClickDeleteSkillButton}
                                onMoveSkill={onMoveSkill}
                            />
                        ))}
                    </tbody>
                </table>
                <IconButton name={'add'} icon={faPlusSquare} size={'small'} onClick={onClickAddSkillButton} />
            </div>
        </div>
    );
};

const ParameterInputField = (props: {
    name: string;
    value: number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
    return (
        <InputField
            name={props.name}
            value={props.value}
            kind="number"
            onChange={props.onChange}
            showBorder={false}
            textAlign={'center'}
        />
    );
};

const DraggableSkillTableRow = (props: {
    skill: FrontendSkill;
    idx: number;
    onChangeElementSkillText: (e: React.ChangeEvent<HTMLInputElement>, idx: number) => void;
    onClickDeleteSkillButton: (e: React.MouseEvent<HTMLInputElement, MouseEvent>, skillId: SkillId) => void;
    onMoveSkill: (dragIdx: number, dropIdx: number) => void;
}) => {
    const { skill, idx, onChangeElementSkillText, onClickDeleteSkillButton, onMoveSkill } = props;

    const [, drag] = useDrag({
        item: { type: 'Skill', idx: idx },
    });

    const [, drop] = useDrop({
        accept: 'Skill',
        drop: (_, dragTargetMonitor) => onMoveSkill(dragTargetMonitor.getItem().idx, idx),
    });

    return (
        <tr ref={drag} className="character-details__skills__table__skill">
            <td ref={drop} className="character-details__skills__table__skill__timing">
                <InputField
                    name={'timing'}
                    value={skill.timing}
                    kind={'text'}
                    onChange={e => onChangeElementSkillText(e, idx)}
                />
            </td>
            <td className="character-details__skills__table__skill__name">
                <InputField
                    name={'name'}
                    value={skill.name}
                    kind={'text'}
                    onChange={e => onChangeElementSkillText(e, idx)}
                />
            </td>
            <td className="character-details__skills__table__skill__determination-way">
                <InputField
                    name={'determinationWay'}
                    value={skill.determinationWay}
                    kind={'text'}
                    size={'small'}
                    onChange={e => onChangeElementSkillText(e, idx)}
                />
            </td>
            <td className="character-details__skills__table__skill__range">
                <InputField
                    name={'range'}
                    value={skill.range}
                    kind={'text'}
                    size={'small'}
                    onChange={e => onChangeElementSkillText(e, idx)}
                />
            </td>
            <td className="character-details__skills__table__skill__target">
                <InputField
                    name={'target'}
                    value={skill.target}
                    kind={'text'}
                    size={'small'}
                    onChange={e => onChangeElementSkillText(e, idx)}
                />
            </td>
            <td className="character-details__skills__table__skill__restriction">
                <InputField
                    name={'restriction'}
                    value={skill.restriction}
                    kind={'text'}
                    onChange={e => onChangeElementSkillText(e, idx)}
                />
            </td>
            <td className="character-details__skills__table__skill__detail">
                <InputField
                    name={'detail'}
                    value={skill.detail}
                    kind={'text'}
                    size={'large'}
                    onChange={e => onChangeElementSkillText(e, idx)}
                />
            </td>
            <td className="character-details__skills__table__skill__detail">
                <IconButton
                    name={'delete'}
                    icon={faTrashAlt}
                    size={'small'}
                    onClick={e => onClickDeleteSkillButton(e, skill.frontendId)}
                />
            </td>
        </tr>
    );
};
