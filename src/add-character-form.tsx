import * as React from 'react';
import { CharacterProps } from './main';

type AddCharacterFormProps = {
    name: string,
    onChangeCharacterForm: (e: any) => void,
    onClickAddCharacter: (e: any) => void,
}

export function AddCharacterForm(props: AddCharacterFormProps) {
    return(
        <div className="add-character">
            <input
                type="text"
                className="add-character__input"
                name='add-input'
                placeholder='キャラクター名'
                value={props.name}
                onChange={props.onChangeCharacterForm}
            />
            <input
                type="button"
                className="add-character__button"
                name='add-button'
                value='新しくキャラクターを追加'
                onClick={props.onClickAddCharacter}
            />
        </div>
    )
}