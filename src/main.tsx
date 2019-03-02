import * as React from 'react';
import * as ReactDOM from 'react-dom';

type CharacterListState = {
    characters: CharacterProps[];
}

type CharacterProps = {
    id: string,
    name: string,
    actionPriority: number,
    hp: number,
    physicalDefence: number,
    magicalDegence: number,
}

type CharacterElementProps = CharacterProps & {
    onElementChange: (e: any) => void,
}

function Character(
    name: string,
    actionPriority: number,
    hp: number,
    physicalDefence: number,
    magicalDegence: number
): CharacterProps {
    return {id: name,
            name,
            actionPriority,
            hp,
            physicalDefence,
            magicalDegence};
}

class CharacterList extends React.Component<{}, CharacterListState> {
    constructor(props: any) {
        super(props);
        this.state = {
            characters: [Character('john', 20, 90, 15, 10), Character('kiwi', 9, 150, 20, 30), Character('karina', 36, 100, 1, 5)]
                .sort((a, b) => (b.actionPriority - a.actionPriority))
        };
    }

    sort() {
        const newCharacters = this.state.characters.slice();
        this.setState({
            characters: newCharacters.sort((a, b) => (b.actionPriority - a.actionPriority))
        });
    }

    handleChange(e: any, name: string) {
        // console.log(e.target);
        const newCharacters = this.state.characters.slice();
        const idx = newCharacters.map(x => x.name).indexOf(name);
        newCharacters[idx]['name'] = e.target.value;

        this.setState({
            characters: newCharacters,
        });
    }

    render() {
        console.log(this.state.characters)

        const characterElement = this.state.characters.map(character => (
            <CharacterElement key={character.id} {...character} onElementChange={(e) => this.handleChange(e, character.name)}/>
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
                <tbody>
                    {characterElement}
                </tbody>
            </table>
        );
    }
}

function CharacterElement(props: CharacterElementProps) {
    return (
        <tr className='character-table__character'>
            <td>
                <input
                    type='text'
                    className='character-table__character__name'
                    name={'name'}
                    value={props.name}
                    onChange={props.onElementChange}
                />
            </td>
            <td>{props.actionPriority}</td>
            <td>{props.hp}</td>
            <td>{props.physicalDefence}</td>
            <td>{props.magicalDegence}</td>
        </tr>
    )
}

// class CharacterElement extends React.Component<CharacterElementProps, {}> {
//     constructor(props: CharacterElementProps) {
//         super(props);
//         this.handleChange = this.handleChange.bind(this);
//     }

//     handleChange(e: any) {
//         this.props.onElementChange(e);
//     }

//     render() {
//         const props = this.props;
//         return (
//             <tr className={`character-table__character`}>
//                 <td>
//                     <input
//                         type='text'
//                         className={`character-table__character$__name`}
//                         name={'name'}
//                         value={props.name}
//                         onChange={props.onElementChange}
//                     />
//                 </td>
//                 <td>{props.actionPriority}</td>
//                 <td>{props.hp}</td>
//                 <td>{props.physicalDefence}</td>
//                 <td>{props.magicalDegence}</td>
//             </tr>
//         )
//     }
// }

ReactDOM.render(<CharacterList />, document.getElementById('root'));
