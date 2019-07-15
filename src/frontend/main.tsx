import * as React from 'react';
import * as ReactDOM from 'react-dom';
import MainContainer from './container';
import { DiceRoller } from './dice-roller';
import { Provider } from 'react-redux';
import store from './store';

function Container() {
    return (
        <Provider store={store}>
            <div className="container">
                <MainContainer />
                <DiceRoller />
            </div>
        </Provider>
    );
}

ReactDOM.render(<Container />, document.getElementById('root'));
