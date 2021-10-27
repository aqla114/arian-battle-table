import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ShowBattleContainer } from './show-battle/show-battle-container';
import { DiceRoller } from './show-battle/components/dice-roller';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { BattleSessionsListContainer } from './list-battle-sessions/battle-sessions-list-container';
import { store } from './store';

const list = () => (
    <div className="container">
        <BattleSessionsListContainer />
    </div>
);

const show = () => (
    <div className="container">
        <ShowBattleContainer />
        <DiceRoller />
    </div>
);

function Container() {
    return (
        <Provider store={store}>
            <Router>
                <Route path="/battle-sessions" exact component={list} />
                <Route path="/battle-session/:id" exact component={show} />
            </Router>
        </Provider>
    );
}

ReactDOM.render(<Container />, document.getElementById('root'));
