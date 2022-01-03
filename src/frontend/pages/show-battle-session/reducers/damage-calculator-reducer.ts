import { updateObject } from '../../../utils/reducer-commons';
import { UpdateDamageStateProps } from '../actions/update-damage-state';
import { State } from '../state';

export const updateDamageState: (state: State, props: UpdateDamageStateProps) => State = (state, props) => {
    console.log(props);
    return {
        ...state,
        state: { ...state.state, damage: updateObject(state.state.damage, props) },
        current: { ...state.current },
    };
};
