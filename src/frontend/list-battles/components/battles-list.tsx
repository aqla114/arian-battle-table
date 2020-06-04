import * as React from 'react';
import { Actions } from '../list-battles-container';
import { InputFieldWithButton } from '../../components/molecules/input-field-with-button';
// import { CardContainer } from '../../components/card-container';

type BattleSession = {
    id: number;
    sessionName: string;
    createdAt: string;
    updatedAt: string;
};

export type BattlesListState = {
    sessionName: string;
    battlesList: BattleSession[];
};

type BattlesListProps = Actions & BattlesListState;

function formatDate(date: Date): string {
    return `${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`;
}

export const BattlesList: React.SFC<BattlesListProps> = (props: BattlesListProps) => {
    React.useEffect(() => {
        props.loadBattleSessions();
    }, []);

    const sessions = props.battlesList.map(session => (
        <li key={session.id} className='battles-list__session'>
            <div className="battles-list__session__id">
                <a href={`/battle/${session.id}`}>{session.id}</a>
            </div>
            <div className="battles-list__session__session-name">{session.sessionName}</div>
            <div className="battles-list__session__created-at">{formatDate(new Date(session.createdAt))}</div>
            <div className="battles-list__session__updated-at">{formatDate(new Date(session.updatedAt))}</div>
        </li>
    ));

    return (
        <div>
            <InputFieldWithButton
                name={'session-name'}
                value={props.sessionName}
                buttonLabel={'新しくセッションを追加'}
                placeholder={'セッション名'}
                onChange={e => props.updateCurrentSessionName(e)}
                onClick={() => props.createBattleSession(props.sessionName)}
            />
            <li className="battles-list__header">
                <div className="battles-list__header__id">id</div>
                <div className="battles-list__header__session-name">セッション名</div>
                <div className="battles-list__header__created-at">作成日時</div>
                <div className="battles-list__header__updated-at">更新日時</div>
            </li>
            {sessions}
        </div>
    );
};
