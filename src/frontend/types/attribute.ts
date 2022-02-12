export type Attribute = 'None' | 'Fire' | 'Water' | 'Wind' | 'Earth' | 'Light' | 'Darkness';

export const attributeLabels: { [key in Attribute]: string } = {
    None: '無',
    Fire: '火',
    Water: '水',
    Wind: '風',
    Earth: '土',
    Light: '光',
    Darkness: '闇',
};

export type DamageAttributeRaw = Attribute | 'Physic' | 'Penetrate';

export const damageAttributeLabels: { [key in DamageAttributeRaw]: string } = {
    ...attributeLabels,
    Physic: '物理',
    Penetrate: '貫通',
};

export const AttributeWeakness: { [key in DamageAttributeRaw]: DamageAttributeRaw | null } = {
    Physic: null,
    None: null,
    Fire: 'Water',
    Water: 'Fire',
    Wind: 'Earth',
    Earth: 'Wind',
    Light: 'Darkness',
    Darkness: 'Light',
    Penetrate: null,
};

export const AttributeRegistry: { [key in DamageAttributeRaw]: DamageAttributeRaw | null } = {
    Physic: null,
    None: null,
    Fire: 'Fire',
    Water: 'Water',
    Wind: 'Wind',
    Earth: 'Earth',
    Light: 'Light',
    Darkness: 'Darkness',
    Penetrate: null,
};

export function calculateMagicDefenceFactor(damageAttribute: DamageAttributeRaw, characterAttribute: Attribute) {
    // こうかはばつぐんだ！
    // 雑に貫通ダメージは魔法ダメージとして扱って魔防0にしてしまっている。
    if (AttributeWeakness[damageAttribute] === characterAttribute || damageAttribute === 'Penetrate') {
        return 0;
    }

    if (AttributeRegistry[damageAttribute] === characterAttribute) {
        return 2.0;
    }

    return 1.0;
}
