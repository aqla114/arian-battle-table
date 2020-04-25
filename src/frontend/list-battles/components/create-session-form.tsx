import * as React from 'react';

type CreateSessionFormProps = {
    sessionName: string;
    onChangeSessionNameForm: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onClickCreateSession: (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => void;
};

export function CreateSessionForm(props: CreateSessionFormProps) {
    return (
        <div className="create-session">
            <input
                type="text"
                className="create-session__input"
                name="create-input"
                placeholder="セッション名"
                value={props.sessionName}
                onChange={props.onChangeSessionNameForm}
            />
            <input
                type="button"
                className="create-session__button"
                name="create-button"
                value="新しくセッションを追加"
                onClick={props.onClickCreateSession}
            />
        </div>
    );
}
