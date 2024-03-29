import * as React from 'react';

import { CheckBox } from '../../../components/atoms/checkbox';
import { BadStatusButtons, BadStatusProps } from './bad-status-buttons';
import { getBadStatusLabels } from '../../../types/bad-status';
import { InputField } from '../../../components/atoms/input-field';
import { ComibnedInputField } from '../../../components/molecules/combined-input-field';
import { Dropdown } from '../../../components/atoms/dropdown';
import { attributeLabels } from '../../../types/attribute';
import { IconButton } from '../../../components/atoms/icon-button';
import { faCopy, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { OnClickDropdownListItem } from '../../../components/atoms/button-dropdown';
import { Textarea } from '../../../components/atoms/textarea';
import { FrontendCharacter } from '../../../types/character';
import * as Request from 'superagent';

type CharacterElementProps = FrontendCharacter & {
    isNextPrior: boolean;
    onChangeElementText: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onChangeElementNumber: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onClickDropdownItem: OnClickDropdownListItem;
    onChangeElementCheckbox: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onChangeElementDropdown: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onCopyCharacter: (character: FrontendCharacter) => void;
    onDeleteCharacter: (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => void;
    onClickCharacterDetailsButton: (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => void;
};

export function CharacterElement(props: CharacterElementProps) {
    const { id, ...badStatusWithoutId } = props.badStatus;

    const badStatusLabels = getBadStatusLabels({ ...props.badStatus });

    const onCopyCharacter = React.useCallback(
        async (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
            const sessionId = location.pathname.split('/').slice(-1)[0];

            Request.post(`/api/${sessionId}/characters`)
                .send({ characterId: props.id })
                .end((err, res) => {
                    if (err) {
                        console.error(err);
                    } else {
                        console.log(res.body);
                        props.onCopyCharacter(res.body);
                    }
                });
        },
        [props.id],
    );

    const badStatusList: BadStatusProps[] = Object.entries(badStatusWithoutId).map(([key, value]) => {
        if (key === 'poisoned' || key === 'knockback') {
            return {
                label: badStatusLabels[key as keyof typeof badStatusWithoutId],
                name: key,
                value,
                statusType: 'number' as const,
                onClick: props.onClickDropdownItem,
            };
        } else {
            return {
                label: badStatusLabels[key as keyof typeof badStatusWithoutId],
                name: key,
                value,
                statusType: 'boolean' as const,
                onChange: props.onChangeElementCheckbox,
            };
        }
    });

    return (
        <tr className={`character-table__table__character ${props.isNextPrior ? '--next' : ''}`}>
            <td className="character-table__table__character__is-acted">
                <CheckBox name="isActed" checked={props.isActed} onChange={props.onChangeElementCheckbox} />
            </td>
            <td className="character-table__table__character__name">
                <span className="character-table__table__character__name">
                    <InputField
                        name={'name'}
                        value={props.name}
                        kind="text"
                        onChange={props.onChangeElementText}
                        showBorder={false}
                        textAlign={'right'}
                    />
                </span>
            </td>
            <td className="character-table__table__character__action-priority">
                <ComibnedInputField
                    props1={{
                        name: 'actionPriority',
                        value: props.actionPriority,
                    }}
                    props2={{
                        name: 'defaultActionPriority',
                        value: props.defaultActionPriority,
                    }}
                    onChange={props.onChangeElementNumber}
                />
            </td>
            <td className="character-table__table__character__hp">
                <ComibnedInputField
                    props1={{
                        name: 'hp',
                        value: props.hp,
                    }}
                    props2={{
                        name: 'maxHp',
                        value: props.maxHp,
                    }}
                    onChange={props.onChangeElementNumber}
                />
            </td>
            <td className="character-table__table__character__physical-defence">
                <ComibnedInputField
                    props1={{
                        name: 'physicalDefence',
                        value: props.physicalDefence,
                    }}
                    props2={{
                        name: 'defaultPhysicalDefence',
                        value: props.defaultPhysicalDefence,
                    }}
                    onChange={props.onChangeElementNumber}
                />
            </td>
            <td className="character-table__table__character__magical-defence">
                <ComibnedInputField
                    props1={{
                        name: 'magicalDefence',
                        value: props.magicalDefence,
                    }}
                    props2={{
                        name: 'defaultMagicalDefence',
                        value: props.defaultMagicalDefence,
                    }}
                    onChange={props.onChangeElementNumber}
                />
            </td>
            <td className="character-table__table__character__attribute">
                <Dropdown value={props.attribute} onChange={props.onChangeElementDropdown}>
                    {Object.entries(attributeLabels).map(([key, label]) => (
                        <option value={key} key={key}>
                            {label}
                        </option>
                    ))}
                </Dropdown>
            </td>
            <td className="character-table__table__character__badstatus">
                <BadStatusButtons badStatusList={badStatusList} />
            </td>
            <td className="character-table__table__character__memo">
                <Textarea
                    name="memo"
                    value={props.memo}
                    onChange={props.onChangeElementText}
                    style={{ width: '100%', height: '70px' }}
                />
            </td>
            <td className="character-table__table__character__delete-button">
                <IconButton name="copy" icon={faCopy} onClick={onCopyCharacter} />
                <IconButton name="delete" icon={faTrashAlt} onClick={props.onDeleteCharacter} />
                <IconButton name="detail" icon={faEllipsisV} onClick={props.onClickCharacterDetailsButton} />
            </td>
        </tr>
    );
}
