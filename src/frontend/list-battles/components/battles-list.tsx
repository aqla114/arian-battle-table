import * as React from 'react';

export const BattlesList: React.SFC = (props: any) => {
    return (
        <div>
            <table className="battles-list">
                <thead>
                    <tr>
                        <td>id</td>
                        <td>セッション名</td>
                        <td>キャラクター</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>arian</td>
                        <td>john, kiwi, parm ...</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};
