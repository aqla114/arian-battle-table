import * as React from 'react';

type DiceRollerState = {
    max: number,
    count: number,
    result: number[],
}

type DiceRollerProps = {
    onRoll: () => void,
}


const diceMaxOptions = [6, 10, 100].map(x => (<option key={x} value={x}>{x}</option>));
const diceCountOptions = [...Array(30).keys()].map(x => (<option value={x + 1} key={x + 1}>{x + 1}</option>));

export class DiceRoller extends React.Component<{}, DiceRollerState> {
    constructor(props: any) {
        super(props);
        this.state = {
            max: 6,
            count: 1,
            result: [0],
        };
    }

    roll() {
        const result = [...Array(this.state.count)]
            .map(_ => (Math.floor(Math.random() * this.state.max) + 1))
            .sort();

        console.log(result);

        this.setState({
            result,
        });
    }

    render() {
        const maxCount = this.state.result.filter(dice => dice === this.state.max).length;

        return (
            <div className='dice-roller'>
                <div>だいすろーる</div>
                <select name='dicer-roller__dice-max' value={`${this.state.max}`} onChange={(e) => this.setState({max: Number(e.target.value)})} >
                    {diceMaxOptions}
                </select>
                <span>D</span>
                <select name='dicer-roller__dice-count' value={`${this.state.count}`} onChange={(e) => this.setState({count: Number(e.target.value)})}>
                    {diceCountOptions}
                </select>
                <input
                    type="button"
                    className="dice-roller__roll-button"
                    name='roll-button'
                    value='ロール'
                    onClick={() => this.roll()}
                />
                <div className='dice-roller__result'>
                    {`${this.state.result.join(', ')} ${this.state.result.reduce((acc, v) => (acc + v))} ${maxCount >= 2 ? 'Critical!' : ''}`}
                </div>
            </div>
        );
    }
}