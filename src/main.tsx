import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { CharactersList } from './characters-list';

function Container() {
    return (
        <CharactersList/>
    );
}

ReactDOM.render(<Container />, document.getElementById('root'));
