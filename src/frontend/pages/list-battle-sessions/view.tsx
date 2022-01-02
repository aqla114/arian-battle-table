import * as React from 'react';
import { Action } from 'redux';
import { Actions } from './battle-sessions-list-container';
import { InputFieldWithButton } from '../../components/molecules/input-field-with-button';
import { CardContainer } from '../../components/card-container';
import { IconButton } from '../../components/atoms/icon-button';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Dialog } from '../../components/molecules/dialog';
import { OpenDeletionModalProps } from './actions/open-deletion-modal';
import { useSelector } from 'react-redux';
import { BattleSession } from './state';

type BattlesListProps = Actions;

function formatDate(date: Date): string {
    return `${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`;
}

export const View: React.FunctionComponent<BattlesListProps> = (props: BattlesListProps) => {
    React.useEffect(() => {
        props.loadBattleSessions();
    }, []);

    const battleSessionsListState = useSelector(state => state.listBattleSessions);

    const sessions = battleSessionsListState.state.battleSessions.map(session => (
        <BattleSessionsListItem key={session.id} session={session} openDeletionModal={props.openDeletionModal} />
    ));

    return (
        <div>
            {battleSessionsListState.dom.modal?.type === 'DeletionModal' ? (
                <Dialog
                    description={'本当に削除しますか？'}
                    enterLabel={'削除する'}
                    cancelLabel={'キャンセル'}
                    onClickEnter={() => props.deleteBattleSession(battleSessionsListState.current.deleteSessionId)}
                    onClickCancel={() => props.closeDeletionModal()}
                />
            ) : null}
            <InputFieldWithButton
                name={'session-name'}
                value={battleSessionsListState.current.sessionName}
                buttonLabel={'新しくセッションを追加'}
                placeholder={'セッション名'}
                onChange={e => props.updateCurrentSessionName(e)}
                onClick={() => props.createBattleSession(battleSessionsListState.current.sessionName)}
            />
            <ul className="battle-sessions-list">
                <li className="battle-sessions-list__header">
                    <div className="battle-sessions-list__header__id">id</div>
                    <div className="battle-sessions-list__header__session-name">セッション名</div>
                    <div className="battle-sessions-list__header__created-at">作成日時</div>
                    <div className="battle-sessions-list__header__updated-at">更新日時</div>
                    <div className="battle-sessions-list__header__delete">削除</div>
                </li>
                {sessions}
            </ul>
        </div>
    );
};

type BattleSessionsListItemProps = {
    session: BattleSession;
    openDeletionModal: (v: OpenDeletionModalProps) => Action<string>;
};

const BattleSessionsListItem: React.FC<BattleSessionsListItemProps> = ({
    session,
    openDeletionModal,
}: BattleSessionsListItemProps) => {
    return (
        <li key={session.id} className="battle-sessions-list__session">
            <a href={`/battle-session/${session.id}`}>
                <CardContainer className="battle-sessions-list__session" isClickable={true}>
                    <div className="battle-sessions-list__session__id">{session.id}</div>
                    <div className="battle-sessions-list__session__session-name">{session.sessionName}</div>
                    <div className="battle-sessions-list__session__created-at">
                        {formatDate(new Date(session.createdAt))}
                    </div>
                    <div className="battle-sessions-list__session__updated-at">
                        {formatDate(new Date(session.updatedAt))}
                    </div>
                </CardContainer>
            </a>
            <div className="battle-sessions-list__session__delete">
                <IconButton
                    name="delete"
                    icon={faTrashAlt}
                    onClick={e => openDeletionModal({ e, payload: session.id })}
                />
            </div>
        </li>
    );
};
