import * as React from 'react';
import { Button } from '../../components/button';

type AddCharacterFormProps = {
    name: string;
    onChangeCharacterForm: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onClickAddCharacter: (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => void;
};

export function AddCharacterForm(props: AddCharacterFormProps) {
    return (
        <div className="add-character">
            <input
                type="text"
                className="add-character__input"
                name="add-input"
                placeholder="キャラクター名"
                value={props.name}
                onChange={props.onChangeCharacterForm}
            />
            <Button
                name="add-character"
                mode="primary"
                value="新しくキャラクターを追加"
                onClick={props.onClickAddCharacter}
            />
        </div>
    );
}
