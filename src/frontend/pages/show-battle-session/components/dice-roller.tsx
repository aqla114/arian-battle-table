import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faDiceFive,
    faDiceFour,
    faDiceOne,
    faDiceSix,
    faDiceThree,
    faDiceTwo,
} from '@fortawesome/free-solid-svg-icons';
import * as uuid from 'uuid';

import { Dropdown } from '../../../components/atoms/dropdown';
import { Button } from '../../../components/atoms/button';
import { CardContainer } from '../../../components/card-container';
import { useDispatch } from 'react-redux';
import { actions } from '../actions/actions';

const INIT_MAX_DICE = 6;
const INIT_COUNT = 1;

type Props = {
    rollResult: number[];
};

export const DiceRoller: React.FC<Props> = ({ rollResult }) => {
    const [maxDice, setMaxDice] = React.useState<number>(INIT_MAX_DICE);
    const [diceNum, setDiceNum] = React.useState<number>(INIT_COUNT);

    const maxDiceCount = rollResult.filter(dice => dice === maxDice).length;
    const diceSum = rollResult.reduce((acc, v) => acc + v);
    const isFanble = rollResult.every(dice => dice === 1);

    const isCritical = maxDiceCount >= 2;

    const dispatch = useDispatch();

    return (
        <CardContainer>
            <div className="dice-roller">
                <Dropdown value={diceNum} onChange={e => setDiceNum(Number(e.target.value))}>
                    {[...Array(40).keys()].map(x => (
                        <option value={x + 1} key={x + 1}>
                            {x + 1}
                        </option>
                    ))}
                </Dropdown>
                <span>D</span>
                <Dropdown value={maxDice} onChange={e => setMaxDice(Number(e.target.value))}>
                    {[6, 10, 100].map(x => (
                        <option key={x} value={x}>
                            {x}
                        </option>
                    ))}
                </Dropdown>
                <Button
                    className="dice-roller__roll-button"
                    kind="primary"
                    name="roll-button"
                    value="ロール"
                    onClick={() => dispatch(actions.updateRollResult({ rollResult: roll(maxDice, diceNum) }))}
                />
                <div className="dice-roller__result">
                    <span className="dice-roller__result__dices">
                        {rollResult.map(dice => (
                            <DiceIcon key={uuid.v4()} dice={dice} />
                        ))}
                    </span>
                    <span className="dice-roller__result__sum">{diceSum}</span>
                    {isCritical ? (
                        <span className="dice-roller__result__critical">{`クリティカル！ x${maxDiceCount}`}</span>
                    ) : null}
                    {isFanble ? <span className="dice-roller__result__fanble">ファンブル！</span> : null}
                </div>
            </div>
        </CardContainer>
    );
};

const roll = (maxDice: number, diceNum: number) => {
    const result = [...Array(diceNum)].map(_ => Math.floor(Math.random() * maxDice) + 1).sort();
    console.log(result);

    return result;
};

const DiceIcon = ({ dice }: { dice: number }) => {
    let diceIcon = faDiceOne;
    switch (dice) {
        case 1:
            diceIcon = faDiceOne;
            break;
        case 2:
            diceIcon = faDiceTwo;
            break;
        case 3:
            diceIcon = faDiceThree;
            break;
        case 4:
            diceIcon = faDiceFour;
            break;
        case 5:
            diceIcon = faDiceFive;
            break;
        case 6:
            diceIcon = faDiceSix;
            break;
    }
    return <FontAwesomeIcon icon={diceIcon} className={'dice-roller__result__dices__icon'} />;
};
