import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { CharactersTable } from './characters-table';
import { DiceRoller } from './dice-roller';

function Container() {
    return (
        <div className="container">
            <CharactersTable />
            <DiceRoller />
        </div>
    );
}

ReactDOM.render(<Container />, document.getElementById('root'));
