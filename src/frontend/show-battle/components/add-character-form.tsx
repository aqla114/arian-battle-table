import * as React from 'react';
import { Button } from '../../components/button';
import { InputField } from '../../components/input-field';

type AddCharacterFormProps = {
    name: string;
    onChangeCharacterForm: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onClickAddCharacter: (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => void;
};

export function AddCharacterForm(props: AddCharacterFormProps) {
    return (
        <div className="add-character">
            <InputField
                kind="text"
                name="character-nae"
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
