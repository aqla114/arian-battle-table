import * as React from 'react';
import { Actions } from '../list-battles-container';
import { CreateSessionForm } from './create-session-form';

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
        <tr key={session.id}>
            <td>
                <a href={`/battle/${session.id}`}>{session.id}</a>
            </td>
            <td>{session.sessionName}</td>
            <td>{formatDate(new Date(session.createdAt))}</td>
            <td>{formatDate(new Date(session.updatedAt))}</td>
        </tr>
    ));

    return (
        <div>
            <CreateSessionForm
                sessionName={props.sessionName}
                onChangeSessionNameForm={e => props.updateCurrentSessionName(e)}
                onClickCreateSession={() => props.createBattleSession(props.sessionName)}
            />
            <table className="battles-list">
                <thead>
                    <tr>
                        <td>id</td>
                        <td>セッション名</td>
                        <td>作成日時</td>
                        <td>更新日時</td>
                    </tr>
                </thead>
                <tbody>{sessions}</tbody>
            </table>
        </div>
    );
};
