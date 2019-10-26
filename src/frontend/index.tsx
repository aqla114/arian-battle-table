import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ShowBattleContainer } from './show-battle/show-battle-container';
import { DiceRoller } from './show-battle/components/dice-roller';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import store from './show-battle/store';
import { BattlesListContainer } from './list-battles/list-battles-container';

const list = () => (
    <Provider store={store}>
        <div className="container">
            <BattlesListContainer />
        </div>
    </Provider>
);

const show = () => (
    <Provider store={store}>
        <div className="container">
            <ShowBattleContainer />
            <DiceRoller />
        </div>
    </Provider>
);

function Container() {
    return (
        <Router>
            <Route path="/list-battles" exact component={list} />
            <Route path="/battle/:id" exact component={show} />
        </Router>
    );
}

ReactDOM.render(<Container />, document.getElementById('root'));
