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

import { Dropdown } from '../../components/atoms/dropdown';
import { Button } from '../../components/atoms/button';
import { CardContainer } from '../../components/card-container';

type DiceRollerState = {
    count: number;
    max: number;
    result: number[];
};

const diceCountOptions = [...Array(40).keys()].map(x => (
    <option value={x + 1} key={x + 1}>
        {x + 1}
    </option>
));

const diceMaxOptions = [6, 10, 100].map(x => (
    <option key={x} value={x}>
        {x}
    </option>
));

export class DiceRoller extends React.Component<{}, DiceRollerState> {
    constructor(props: any) {
        super(props);
        this.state = {
            count: 1,
            max: 6,
            result: [0],
        };
    }

    roll() {
        const result = [...Array(this.state.count)].map(_ => Math.floor(Math.random() * this.state.max) + 1).sort();

        console.log(result);

        this.setState({
            result,
        });
    }

    render() {
        const maxCount = this.state.result.filter(dice => dice === this.state.max).length;
        const isFanble = this.state.result.every(dice => dice === 1);

        return (
            <CardContainer>
                <div className="dice-roller">
                    <div>ダイスロール</div>
                    <Dropdown
                        value={this.state.count}
                        options={diceCountOptions}
                        onChange={e => this.setState({ count: Number(e.target.value) })}
                    />
                    <span>D</span>
                    <Dropdown
                        value={this.state.max}
                        options={diceMaxOptions}
                        onChange={e => this.setState({ max: Number(e.target.value) })}
                    />
                    <Button kind="primary" name="roll-button" value="ロール" onClick={() => this.roll()} />
                    <div className="dice-roller__result">
                        <span className="dice-roller__result__dices">
                            {this.state.result.map(dice => (
                                <DiceIcon key={uuid.v4()} dice={dice} />
                            ))}
                        </span>
                        <span className="dice-roller__result__sum">
                            {this.state.result.reduce((acc, v) => acc + v)}
                        </span>
                        {maxCount >= 2 ? (
                            <span className="dice-roller__result__critical">{`クリティカル！ x${maxCount}`}</span>
                        ) : null}
                        {isFanble ? <span className="dice-roller__result__fanble">ファンブル！</span> : null}
                    </div>
                </div>
            </CardContainer>
        );
    }
}

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
