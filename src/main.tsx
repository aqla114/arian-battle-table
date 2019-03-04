import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { CharactersList } from './characters-list';
import { DiceRoller } from './dice-roller';

function Container() {
    return (
        <div className='container'>
            <CharactersList />
            <DiceRoller />
        </div>
    );
}

ReactDOM.render(<Container />, document.getElementById('root'));
