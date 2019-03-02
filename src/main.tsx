import * as React from 'react';
import * as ReactDOM from 'react-dom';

interface ICharacterProps {
    [key: string]: any;
}

type CharacterListState = {
    characters: CharacterProps[];
};

type CharacterProps = {
    name: string;
    actionPriority: number;
    hp: number;
    physicalDefence: number;
    magicalDegence: number;
};

type CharacterElementProps = CharacterProps & {
    onElementChange: (e: any) => void;
};

type CharacterAttributePros = {
    kind: string;
    value: string;
};

function Character(
    name: string,
    actionPriority: number,
    hp: number,
    physicalDefence: number,
    magicalDegence: number,
): CharacterProps {
    return { name, actionPriority, hp, physicalDefence, magicalDegence };
}

class CharacterList extends React.Component<{}, CharacterListState> {
    constructor(props: any) {
        super(props);
        this.state = {
            characters: [
                Character('john', 20, 90, 15, 10),
                Character('kiwi', 9, 150, 20, 30),
                Character('karina', 36, 100, 1, 5),
            ].sort((a, b) => b.actionPriority - a.actionPriority),
        };
    }

    handleChange(e: any, name: string) {
        // console.log(e.target);
        const newCharacters = this.state.characters.slice();
        const idx = newCharacters.map(x => x.name).indexOf(name);

        console.log(e.target, name);

        (newCharacters as ICharacterProps)[idx][e.target.name] = e.target.value;

        newCharacters.sort((a, b) => b.actionPriority - a.actionPriority)

        this.setState({
            characters: newCharacters,
        });
    }

    render() {
        console.log(this.state.characters);

        const characterElement = this.state.characters.map(character => (
            <CharacterElement
                key={character.name}
                {...character}
                onElementChange={e => this.handleChange(e, character.name)}
            />
        ));

        return (
            <table className="character-table">
                <thead>
                    <tr>
                        <td>name</td>
                        <td>actionPriority</td>
                        <td>hp</td>
                        <td>physicalDefence</td>
                        <td>magicalDegence</td>
                    </tr>
                </thead>
                <tbody>{characterElement}</tbody>
            </table>
        );
    }
}

function CharacterElement(props: CharacterElementProps) {
    return (
        <tr className="character-table__character">
            <td>
                {props.name}
            </td>
            <td>
                <input
                    type="text"
                    className="character-table__character__actionPriority"
                    name={'actionPriority'}
                    value={props.actionPriority}
                    onChange={props.onElementChange}
                />
            </td>
            <td>{props.hp}</td>
            <td>{props.physicalDefence}</td>
            <td>{props.magicalDegence}</td>
        </tr>
    );
}

ReactDOM.render(<CharacterList />, document.getElementById('root'));
