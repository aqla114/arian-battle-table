import { connect } from 'react-redux';
import { BattlesList } from './components/battles-list';

function mapStateToProps(state) {
    return Object.assign({}, state.charactersTabel);
}

function mapDispatchToProps(dispatch) {
    return {};
}

export const ShowBattleContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(BattlesList);
