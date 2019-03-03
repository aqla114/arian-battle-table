import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { CharacterElement } from './character-element';
import { AddCharacterForm } from './add-character-form';

const defaultCharacters = [
    // Character('ジョン', 19, 90, 15, 10),
    Character('kiwi', 9, 147, 20, 30),
    Character('カリーナ', 36, 125, 1, 5),
    Character('抹茶', 22, 91, 1, 5),
    Character('太郎', 38, 107, 1, 5),
    Character('パルム', 6, 161, 1, 5),
];

interface ICharacterProps {
    [key: string]: any;
}

type CharacterListState = {
    characters: CharacterProps[];
    currentNewCharacter: CharacterProps;
};

export type CharacterProps = {
    name: string;
    actionPriority: number;
    hp: number;
    physicalDefence: number;
    magicalDefence: number;
    isKnockBack: boolean;
};

function Character(
    name: string,
    actionPriority: number,
    hp: number,
    physicalDefence: number,
    magicalDefence: number,
): CharacterProps {
    return { name, actionPriority, hp, physicalDefence, magicalDefence, isKnockBack: false };
}

export class CharactersList extends React.Component<{}, CharacterListState> {
    constructor(props: any) {
        super(props);
        this.state = {
            characters: defaultCharacters.sort((a, b) => b.actionPriority - a.actionPriority),
            currentNewCharacter: Character('', 0, 0, 0, 0),
        };
    }

    updateCharacterAttributeText(e: any, name: string) {
        const characters = this.state.characters.slice();
        const idx = characters.map(x => x.name).indexOf(name);
        (characters as ICharacterProps)[idx][e.target.name] = e.target.value;
        characters.sort((a, b) => b.actionPriority - a.actionPriority);


        this.setState({
            characters,
        });
    }

    updateCharacterIsKnockBack(e: any, name: string) {
        console.log(this.state.characters);
        console.log(e.target);
        const characters = this.state.characters.slice();
        const idx = characters.map(x => x.name).indexOf(name);
        (characters as ICharacterProps)[idx].isKnockBack = !(characters as ICharacterProps)[idx].isKnockBack;

        if ((characters as ICharacterProps)[idx].isKnockBack) {
            (characters as ICharacterProps)[idx].actionPriority -= 10;
        } else {
            (characters as ICharacterProps)[idx].actionPriority += 10;
        }

        characters.sort((a, b) => b.actionPriority - a.actionPriority);

        this.setState({
            characters,
        });
    }

    updateCurrentNewCharacter(e: any) {
        this.setState({
            currentNewCharacter: Character(e.target.value, 0, 0, 0, 0),
        });
    }

    addCharacter() {
        const characters = this.state.characters.slice();

        if (characters.some(x => x.name === this.state.currentNewCharacter.name)) {
            window.alert('すでに存在しているキャラクター名です。キャラクター名は別のものを入力してください。');
            return;
        }

        if (this.state.currentNewCharacter.name === '') {
            window.alert('キャラクターネームが空白です。');
            return;
        }

        characters.push(this.state.currentNewCharacter);
        characters.sort((a, b) => b.actionPriority - a.actionPriority);

        this.setState({
            characters,
            currentNewCharacter: Character('', 0, 0, 0, 0),
        });
    }

    deleteCharacter(e: any, name: string) {
        const characters = this.state.characters.slice().filter(x => x.name !== name);

        this.setState({
            characters,
        });
    }

    render() {
        const characterElement = this.state.characters.map(character => (
            <CharacterElement
                key={character.name}
                {...character}
                onChangeElementText={(e) => this.updateCharacterAttributeText(e, character.name)}
                onChangeElementCheckbox={(e) => this.updateCharacterIsKnockBack(e, character.name)}
                onDeleteCharacter={(e) => this.deleteCharacter(e, character.name)}
            />
        ));

        return (
            <div>
                <table className="character-table">
                    <thead>
                        <tr>
                            <td>名前</td>
                            <td>行動値</td>
                            <td>HP</td>
                            <td>物理防御力</td>
                            <td>魔法防御力</td>
                            <td>ノックバック(2)</td>
                            <td>キャラクターの削除</td>
                        </tr>
                    </thead>
                    <tbody>{characterElement}</tbody>
                </table>
                <AddCharacterForm
                    name={this.state.currentNewCharacter.name}
                    onChangeCharacterForm={(e) => this.updateCurrentNewCharacter(e)}
                    onClickAddCharacter={() => this.addCharacter()}
                />
            </div>
        );
    }
}

ReactDOM.render(<CharactersList />, document.getElementById('root'));
