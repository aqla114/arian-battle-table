import * as React from 'react';
import { Actions } from '../list-battles-container';
import { InputFieldWithButton } from '../../components/molecules/input-field-with-button';
import { CardContainer } from '../../components/card-container';
import { IconButton } from '../../components/atoms/icon-button';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal } from '../../types/modal';
import { Dialog } from '../../components/molecules/dialog';

export type BattleSession = {
    id: number;
    sessionName: string;
    createdAt: string;
    updatedAt: string;
};

export type BattlesListState = {
    state: {
        battlesList: BattleSession[];
    };
    current: { sessionName: string; deleteSessionId: number };
    dom: {
        modal: Modal | null;
    };
};

type BattlesListProps = Actions & BattlesListState;

function formatDate(date: Date): string {
    return `${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`;
}

export const BattleSessionsList: React.FunctionComponent<BattlesListProps> = (props: BattlesListProps) => {
    React.useEffect(() => {
        props.loadBattleSessions();
    }, []);

    const sessions = props.state.battlesList.map(session => (
        <li key={session.id} className="battles-list__session">
            <a href={`/battle/${session.id}`}>
                <CardContainer className="battles-list__session" isClickable={true}>
                    <div className="battles-list__session__id">{session.id}</div>
                    <div className="battles-list__session__session-name">{session.sessionName}</div>
                    <div className="battles-list__session__created-at">{formatDate(new Date(session.createdAt))}</div>
                    <div className="battles-list__session__updated-at">{formatDate(new Date(session.updatedAt))}</div>
                </CardContainer>
            </a>
            <div className="battles-list__session__delete">
                <IconButton
                    name="delete"
                    icon={faTrashAlt}
                    onClick={e => props.openDeletionModal({ e, payload: session.id })}
                />
            </div>
        </li>
    ));

    console.log(props.dom.modal);

    return (
        <div>
            {props.dom.modal?.type === 'DeletionModal' ? (
                <Dialog
                    description={'本当に削除しますか？'}
                    enterLabel={'削除する'}
                    cancelLabel={'キャンセル'}
                    onClickEnter={() => props.deleteBattleSession(props.current.deleteSessionId)}
                    onClickCancel={() => props.closeDeletionModal()}
                />
            ) : null}
            <InputFieldWithButton
                name={'session-name'}
                value={props.current.sessionName}
                buttonLabel={'新しくセッションを追加'}
                placeholder={'セッション名'}
                onChange={e => props.updateCurrentSessionName(e)}
                onClick={() => props.createBattleSession(props.current.sessionName)}
            />
            <ul className="battles-list">
                <li className="battles-list__header">
                    <div className="battles-list__header__id">id</div>
                    <div className="battles-list__header__session-name">セッション名</div>
                    <div className="battles-list__header__created-at">作成日時</div>
                    <div className="battles-list__header__updated-at">更新日時</div>
                    <div className="battles-list__header__delete">削除</div>
                </li>
                {sessions}
            </ul>
        </div>
    );
};
