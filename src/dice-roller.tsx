import * as React from 'react';

type DiceRollerState = {
    count: number;
    max: number;
    result: number[];
};

type DiceRollerProps = {
    onRoll: () => void;
};

const diceCountOptions = [...Array(30).keys()].map(x => (
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
            <div className="dice-roller">
                <div>だいすろーる</div>
                <select
                    className="dice-roller__dice-count"
                    value={`${this.state.count}`}
                    onChange={e => this.setState({ count: Number(e.target.value) })}
                >
                    {diceCountOptions}
                </select>
                <span>D</span>
                <select
                    className="dice-roller__dice-max"
                    value={`${this.state.max}`}
                    onChange={e => this.setState({ max: Number(e.target.value) })}
                >
                    {diceMaxOptions}
                </select>
                <input
                    type="button"
                    className="dice-roller__roll-button"
                    name="roll-button"
                    value="ロール"
                    onClick={() => this.roll()}
                />
                <div className="dice-roller__result">
                    <span className="dice-roller__result__dices">{this.state.result.join(', ')}</span>
                    <span className="dice-roller__result__sum">{this.state.result.reduce((acc, v) => acc + v)}</span>
                    {maxCount >= 2 ? (
                        <span className="dice-roller__result__critical">{`クリティカル！ x${maxCount}`}</span>
                    ) : null}
                    {isFanble ? <span className="dice-roller__result__fanble">ファンブル！</span> : null}
                </div>
            </div>
        );
    }
}
