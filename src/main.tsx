import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { CharacterElement } from './character-element';

const defaultCharacters = [
    Character('ジョン', 19, 90, 15, 10),
    Character('kiwi', 9, 150, 20, 30),
    Character('カリーナ', 36, 100, 1, 5),
    Character('抹茶', 22, 100, 1, 5),
    Character('太郎', 38, 100, 1, 5),
    Character('パルム', 4, 100, 1, 5),
]

interface ICharacterProps {
    [key: string]: any,
}

type CharacterListState = {
    characters: CharacterProps[],
    currentNewCharacter: CharacterProps,
};

export type CharacterProps = {
    name: string;
    actionPriority: number;
    hp: number;
    physicalDefence: number;
    magicalDefence: number;
};


function Character(
    name: string,
    actionPriority: number,
    hp: number,
    physicalDefence: number,
    magicalDefence: number,
): CharacterProps {
    return { name, actionPriority, hp, physicalDefence, magicalDefence };
}

class CharacterList extends React.Component<{}, CharacterListState> {
    constructor(props: any) {
        super(props);
        this.state = {
            characters: defaultCharacters.sort((a, b) => b.actionPriority - a.actionPriority),
            currentNewCharacter: Character('', 0, 0, 0, 0),
        };
    }

    updateCharacterAttribute(e: any, name: string) {
        const newCharacters = this.state.characters.slice();
        const idx = newCharacters.map(x => x.name).indexOf(name);
        (newCharacters as ICharacterProps)[idx][e.target.name] = e.target.value;

        newCharacters.sort((a, b) => b.actionPriority - a.actionPriority)

        this.setState({
            characters: newCharacters,
        });
    }

    updateCurrentNewCharacter(e: any) {
        console.log(this);
        const characters = this.state.characters.slice();
        this.setState({
            characters: characters,
            currentNewCharacter: Character(e.target.value, 0, 0, 0, 0),
        });
    }

    addNewCharacter() {
        console.log('add new character');
        console.log(this.state.currentNewCharacter);

        const characters = this.state.characters.slice();

        if (characters.some(x => x.name === this.state.currentNewCharacter.name)) {
            window.alert('すでに存在しているキャラクター名です。キャラクター名は別のものを入力してください。');
            return;
        }

        characters.push(this.state.currentNewCharacter);
        characters.sort((a, b) => b.actionPriority - a.actionPriority);

        this.setState({
            characters: characters,
            currentNewCharacter: Character('', 0, 0, 0, 0),
        })
    }

    render() {
        const characterElement = this.state.characters.map(character => (
            <CharacterElement
                key={character.name}
                {...character}
                onElementChange={e => this.updateCharacterAttribute(e, character.name)}
            />
        ));

        return (
            <div>
                <table className="character-table">
                    <thead>
                        <tr>
                            <td>name</td>
                            <td>actionPriority</td>
                            <td>hp</td>
                            <td>physicalDefence</td>
                            <td>magicalDefence</td>
                        </tr>
                    </thead>
                    <tbody>
                        {characterElement}
                    </tbody>
                </table>
                <input
                    type="text"
                    className="character-table__character__add-input"
                    name={'add-input'}
                    value={this.state.currentNewCharacter.name}
                    onChange={e => this.updateCurrentNewCharacter(e)}
                />
                <input
                    type="button"
                    className="character-table__character__add-button"
                    name={'add-button'}
                    value={'新しくキャラクターを追加'}
                    onClick={e => this.addNewCharacter()}
                />
            </div>
        );
    }
}

ReactDOM.render(<CharacterList />, document.getElementById('root'));
