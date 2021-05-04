import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ShowBattleContainer } from './show-battle/show-battle-container';
import { DiceRoller } from './show-battle/components/dice-roller';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ShowBattleStore from './show-battle/store';
import ListBattlesStore from './list-battle-sessions/store';
import { BattleSessionsListContainer } from './list-battle-sessions/battle-sessions-list-container';

const list = () => (
    <Provider store={ListBattlesStore}>
        <div className="container">
            <BattleSessionsListContainer />
        </div>
    </Provider>
);

const show = () => (
    <Provider store={ShowBattleStore}>
        <div className="container">
            <ShowBattleContainer />
            <DiceRoller />
        </div>
    </Provider>
);

function Container() {
    return (
        <Router>
            <Route path="/battle-sessions" exact component={list} />
            <Route path="/battle/:id" exact component={show} />
        </Router>
    );
}

ReactDOM.render(<Container />, document.getElementById('root'));
