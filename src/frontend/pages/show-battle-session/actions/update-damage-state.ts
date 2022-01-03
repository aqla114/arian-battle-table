import { DamageAttributeRaw } from '../../../types/attribute';
import { CharacterId } from './actions';

export type ACTION_TYPE = 'UPDATE_DAMAGE_STATE';

export type UpdateDamageStateProps = Partial<{
    fixedDamage: number;
    damageAttribute: DamageAttributeRaw;
    attackTarget: CharacterId;
}>;
