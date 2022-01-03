import { ChangeEvent, FC } from 'react';
import { Button } from '../atoms/button';

type Props = {
    description: string;
    enterLabel: string;
    cancelLabel: string;
    onClickEnter: (e: ChangeEvent<HTMLInputElement>) => void;
    onClickCancel: (e: any) => void;
};

export const Dialog: FC<Props> = (props: Props) => {
    return (
        <div className="modal-wrapper">
            <div className="dialog-window">
                <div className="dialog-window__description">{props.description}</div>
                <div className="dialog-window__enter-button">
                    <Button name="enter-button" kind="delete" value={props.enterLabel} onClick={props.onClickEnter} />
                </div>
                <div className="dialog-window__cancel-button">
                    <Button
                        name="cancel-button"
                        kind="secondary"
                        value={props.cancelLabel}
                        onClick={props.onClickCancel}
                    />
                </div>
            </div>
        </div>
    );
};
