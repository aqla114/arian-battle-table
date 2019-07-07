import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as Request from 'superagent';

import { CharacterElement } from './character-element';
import { AddCharacterForm } from './add-character-form';

type CharacterTableState = {
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
    name: string = '',
    actionPriority: number = 0,
    hp: number = 0,
    physicalDefence: number = 0,
    magicalDefence: number = 0,
): CharacterProps {
    return { name, actionPriority, hp, physicalDefence, magicalDefence, isKnockBack: false };
}

export class CharactersTable extends React.Component<{}, CharacterTableState> {
    constructor(props: any) {
        super(props);

        this.state = {
            characters: [],
            currentNewCharacter: Character(),
        };
    }

    componentDidMount() {
        Request.get(`/api/${location.pathname.slice(1)}/get`).end((err, res) => {
            console.log(res.body);

            const defaultCharacters: CharacterProps[] = res.body;

            this.setState({
                characters: defaultCharacters.sort((a, b) => b.actionPriority - a.actionPriority),
            });
        });
    }

    updateCharacterAttributeText(e: React.ChangeEvent<HTMLInputElement>, name: string) {
        const characters = this.state.characters.slice();
        const idx = characters.map(x => x.name).indexOf(name);
        characters[idx][e.target.name as keyof CharacterProps] = e.target.value;
        characters.sort((a, b) => b.actionPriority - a.actionPriority);

        this.setState({
            characters,
        });
    }

    updateCharacterIsKnockBack(e: React.MouseEvent<HTMLInputElement, MouseEvent>, name: string) {
        console.log(this.state.characters);
        console.log(e.target);
        const characters = this.state.characters.slice();
        const idx = characters.map(x => x.name).indexOf(name);
        characters[idx].isKnockBack = !characters[idx].isKnockBack;

        if (characters[idx].isKnockBack) {
            characters[idx].actionPriority -= 10;
        } else {
            characters[idx].actionPriority += 10;
        }

        characters.sort((a, b) => b.actionPriority - a.actionPriority);

        this.setState({
            characters,
        });
    }

    updateCurrentNewCharacter(e: React.ChangeEvent<HTMLInputElement>) {
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

    deleteCharacter(e: React.MouseEvent<HTMLInputElement, MouseEvent>, name: string) {
        const characters = this.state.characters.slice().filter(x => x.name !== name);

        this.setState({
            characters,
        });
    }

    saveCurrentCharacter() {
        console.log('save');

        Request.post(`/api/${location.pathname.slice(1)}/update`)
            .send(this.state.characters)
            .end((err, res) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log('Response/saveCurrentCharacter : ', res.body);
                }
            });
    }

    render() {
        const characterElement = this.state.characters.map(character => (
            <CharacterElement
                key={character.name}
                {...character}
                onChangeElementText={e => this.updateCharacterAttributeText(e, character.name)}
                onChangeElementCheckbox={e => this.updateCharacterIsKnockBack(e, character.name)}
                onDeleteCharacter={e => this.deleteCharacter(e, character.name)}
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
                    onChangeCharacterForm={e => this.updateCurrentNewCharacter(e)}
                    onClickAddCharacter={() => this.addCharacter()}
                />
                <div className="save-container">
                    <input
                        type="button"
                        className="save-container__save-button"
                        name="save-button"
                        value="保存"
                        onClick={() => this.saveCurrentCharacter()}
                    />
                </div>
            </div>
        );
    }
}

ReactDOM.render(<CharactersTable />, document.getElementById('root'));
