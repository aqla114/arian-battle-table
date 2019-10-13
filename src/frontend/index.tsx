import * as React from 'react';
import * as ReactDOM from 'react-dom';
import MainContainer from './container';
import { DiceRoller } from './components/dice-roller';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import store from './store';

const list = () => <p>list</p>;

const show = () => (
    <Provider store={store}>
        <div className="container">
            <MainContainer />
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
